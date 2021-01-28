const createRandomId = require('json-rpc-random-id')();
const format = require('vapjs-format');

module.exports = Vap;

function Vap(provider, options) {
  const self = this;
  const optionsObject = options || {};

  if (!(this instanceof Vap)) { throw new Error('[vapjs-query] the Vap object requires the "new" flag in order to function normally (i.e. `const vap = new Vap(provider);`).'); }
  if (typeof provider !== 'object') { throw new Error(`[vapjs-query] the Vap object requires that the first input 'provider' must be an object, got '${typeof provider}' (i.e. 'const vap = new Vap(provider);')`); }

  self.options = Object.assign({
    debug: optionsObject.debug || false,
    logger: optionsObject.logger || console,
    jsonSpace: optionsObject.jsonSpace || 0,
  });

  self.currentProvider = provider;
}

Vap.prototype.log = function log(message) {
  const self = this;
  if (self.options.debug) self.options.logger.log(`[vapjs-query log] ${message}`);
};

Vap.prototype.sendAsync = function sendAsync(opts, cb) {
  const self = this;
  self.currentProvider.sendAsync(createPayload(opts), (err, response) => {
    if (err || response.error) return cb(new Error(`[vapjs-query] ${(response.error && 'rpc' || '')} error with payload ${JSON.stringify(opts, null, 0)} ${err || response.error}`));
    return cb(null, response.result);
  });
};

Object.keys(format.schema.methods).forEach((rpcMethodName) => {
  Object.defineProperty(Vap.prototype, rpcMethodName.replace('vap_', ''), {
    enumerable: true,
    value: generateFnFor(rpcMethodName, format.schema.methods[rpcMethodName]),
  });
});

function containsCallback(args) {
  return (args.length > 0 && typeof args[args.length - 1] === 'function');
}

function generateFnFor(method, methodObject) {
  return function outputMethod() {
    var protoCallback = () => {}; // eslint-disable-line
    var inputs = null; // eslint-disable-line
    const self = this;
    const args = [].slice.call(arguments); // eslint-disable-line
    const protoMethod = method.replace('vap_', ''); // eslint-disable-line

    if (containsCallback(args)) {
      protoCallback = args.pop();
    }

    return new Promise((resolve, reject) => {
      const cb = (callbackError, callbackResult) => {
        if (callbackError) {
          reject(callbackError);
          protoCallback(callbackError, null);
        } else {
          try {
            self.log(`attempting method formatting for '${protoMethod}' with raw outputs: ${JSON.stringify(callbackResult, null, self.options.jsonSpace)}`);

            const methodOutputs = format.formatOutputs(method, callbackResult);

            self.log(`method formatting success for '${protoMethod}' formatted result: ${JSON.stringify(methodOutputs, null, self.options.jsonSpace)}`);

            resolve(methodOutputs);
            protoCallback(null, methodOutputs);
          } catch (outputFormattingError) {
            const outputError = new Error(`[vapjs-query] while formatting outputs from RPC '${JSON.stringify(callbackResult, null, self.options.jsonSpace)}' for method '${protoMethod}' ${outputFormattingError}`);

            reject(outputError);
            protoCallback(outputError, null);
          }
        }
      };

      if (args.length < methodObject[2]) {
        return cb(new Error(`[vapjs-query] method '${protoMethod}' requires at least ${methodObject[2]} input (format type ${methodObject[0][0]}), ${args.length} provided. For more information visit: https://github.com/vaporyco/wiki/wiki/JSON-RPC#${method.toLowerCase()}`));
      }

      if (args.length > methodObject[0].length) {
        return cb(new Error(`[vapjs-query] method '${protoMethod}' requires at most ${methodObject[0].length} params, ${args.length} provided '${JSON.stringify(args, null, self.options.jsonSpace)}'. For more information visit: https://github.com/vaporyco/wiki/wiki/JSON-RPC#${method.toLowerCase()}`));
      }

      if (methodObject[3] && args.length < methodObject[3]) {
        args.push('latest');
      }

      self.log(`attempting method formatting for '${protoMethod}' with inputs ${JSON.stringify(args, null, self.options.jsonSpace)}`);

      try {
        inputs = format.formatInputs(method, args);

        self.log(`method formatting success for '${protoMethod}' with formatted result: ${JSON.stringify(inputs, null, self.options.jsonSpace)}`);
      } catch (formattingError) {
        return cb(new Error(`[vapjs-query] while formatting inputs '${JSON.stringify(args, null, self.options.jsonSpace)}' for method '${protoMethod}' error: ${formattingError}`));
      }

      return self.sendAsync({ method, params: inputs }, cb);
    });
  };
}

function createPayload(data) {
  return Object.assign({
    id: createRandomId(),
    jsonrpc: '2.0',
    params: [],
  }, data);
}
