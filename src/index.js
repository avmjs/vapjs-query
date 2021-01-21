const Query = require('vap-query');
const format = require('vapjs-format');

module.exports = Vap;

function log(debug, logger, message) {
  if (debug) logger.log(`[vapjs-query ${(new Date()).toISOString()}] ${message}`);
}

function Vap(provider, options) {
  if (!(this instanceof Vap)) { throw new Error('the Vap object requires the "new" flag in order to function normally (i.e. `const vap = new Vap(provider);`).'); }
  if (typeof provider !== 'object') { throw new Error(`the Vap object requires that the first input 'provider' must be an object, got '${typeof provider}' (i.e. 'const vap = new Vap(provider);')`); }

  const self = this;
  const optionsObject = options || {};
  self.options = Object.assign({
    debug: optionsObject.debug || false,
    logger: optionsObject.logger || console,
    jsonSpace: optionsObject.jsonSpace || 0,
  });

  self.query = new Query(provider);
}

Object.keys(format.schema.methods).forEach((rpcMethodName) => {
  const methodObject = format.schema.methods[rpcMethodName];
  Object.defineProperty(Vap.prototype, rpcMethodName.replace('vap_', ''), {
    enumerable: true,
    value: generateFnFor(methodObject[3] || 1, rpcMethodName), // eslint-disable-line
  });
});

Vap.prototype.makeQuery = function (method, args) { // eslint-disable-line
  const self = this;

  self.query[method].apply(self.query, args);
};

function generateFnFor(length, method) {
  function outputMethod() {
    var cb = (e, r) => {}; // eslint-disable-line
    const self = this;
    const debug = self.options.debug;
    const logger = self.options.logger;
    const minimumArgs = Number(format.schema.methods[method][2]);
    const maximumArgs = format.schema.methods[method][0].length;
    const args = [].slice.call(arguments); // eslint-disable-line
    const queryMethod = method.replace('vap_', ''); // eslint-disable-line

    log(debug, logger, `attempting method ${queryMethod} with params ${JSON.stringify(args, self.options.jsonSpace)}`);

    // if there is a callback, pop it out
    if (typeof args[args.length - 1] === 'function') {
      cb = args.pop();
      log(debug, logger, `[method '${queryMethod}'] callback provided: true`);
    }

    if (args.length < minimumArgs) {
      throw new Error(`method '${queryMethod}' requires at least ${minimumArgs} input (format type ${format.schema.methods[method][0][0]}), ${args.length} provided. For more information visit: https://github.com/vaporyco/wiki/wiki/JSON-RPC#${method.toLowerCase()}`);
    }

    if (args.length > maximumArgs) {
      throw new Error(`method '${queryMethod}' requires at most ${maximumArgs} params, ${args.length} provided '${JSON.stringify(args)}'. For more information visit: https://github.com/vaporyco/wiki/wiki/JSON-RPC#${method.toLowerCase()}`);
    }

    log(debug, logger, `[method '${queryMethod}'] attempting input formatting of ${args.length} inputs`);

    const inputs = format.formatInputs(method, args);

    log(debug, logger, `[method '${queryMethod}'] formatted inputs: ${JSON.stringify(inputs, self.options.jsonSpace)}`);

    const output = new Promise((resolve, reject) => {
      const callback = function(error, result) { // eslint-disable-line
        if (error) {
          reject(error);
          cb(error, result);
        } else {
          log(debug, logger, `[method '${queryMethod}'] callback success, attempting formatting of raw outputs: ${JSON.stringify(result, self.options.jsonSpace)}`);

          const methodOutputs = format.formatOutputs(method, result);

          log(debug, logger, `[method '${queryMethod}'] formatted outputs: ${JSON.stringify(methodOutputs, self.options.jsonSpace)}`);

          resolve(methodOutputs);
          cb(null, methodOutputs);
        }
      };

      inputs.push(callback);

      log(debug, logger, `[method '${queryMethod}'] attempting query with formatted inputs...`);

      self.makeQuery(queryMethod, inputs);
    });

    return output;
  }

  return outputMethod;
}
