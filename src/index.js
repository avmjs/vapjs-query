const Query = require('vap-query');
const format = require('vapjs-format');

module.exports = Vap;

function Vap(provider) {
  const self = this;
  self.query = new Query(provider);
}

Vap.prototype.getBalance = generateFnFor(2, 'vap_getBalance');
Vap.prototype.getCode = generateFnFor(2, 'vap_getCode');
Vap.prototype.getTransactionCount = generateFnFor(2, 'vap_getTransactionCount');
Vap.prototype.getStorageAt = generateFnFor(3, 'vap_getStorageAt');
Vap.prototype.call = generateFnFor(2, 'vap_call');
// standard
Vap.prototype.protocolVersion = generateFnFor(1, 'vap_protocolVersion');
Vap.prototype.syncing = generateFnFor(1, 'vap_syncing');
Vap.prototype.coinbase = generateFnFor(1, 'vap_coinbase');
Vap.prototype.mining = generateFnFor(1, 'vap_mining');
Vap.prototype.hashrate = generateFnFor(1, 'vap_hashrate');
Vap.prototype.gasPrice = generateFnFor(1, 'vap_gasPrice');
Vap.prototype.accounts = generateFnFor(1, 'vap_accounts');
Vap.prototype.blockNumber = generateFnFor(1, 'vap_blockNumber');
Vap.prototype.getBlockTransactionCountByHash = generateFnFor(1, 'vap_getBlockTransactionCountByHash');
Vap.prototype.getBlockTransactionCountByNumber = generateFnFor(1, 'vap_getBlockTransactionCountByNumber');
Vap.prototype.getUncleCountByBlockHash = generateFnFor(1, 'vap_getUncleCountByBlockHash');
Vap.prototype.getUncleCountByBlockNumber = generateFnFor(1, 'vap_getUncleCountByBlockNumber');
Vap.prototype.sign = generateFnFor(1, 'vap_sign');
Vap.prototype.sendTransaction = generateFnFor(1, 'vap_sendTransaction');
Vap.prototype.sendRawTransaction = generateFnFor(1, 'vap_sendRawTransaction');
Vap.prototype.estimateGas = generateFnFor(1, 'vap_estimateGas');
Vap.prototype.getBlockByHash = generateFnFor(1, 'vap_getBlockByHash');
Vap.prototype.getBlockByNumber = generateFnFor(1, 'vap_getBlockByNumber');
Vap.prototype.getTransactionByHash = generateFnFor(1, 'vap_getTransactionByHash');
Vap.prototype.getTransactionByBlockHashAndIndex = generateFnFor(1, 'vap_getTransactionByBlockHashAndIndex');
Vap.prototype.getTransactionByBlockNumberAndIndex = generateFnFor(1, 'vap_getTransactionByBlockNumberAndIndex');
Vap.prototype.getTransactionReceipt = generateFnFor(1, 'vap_getTransactionReceipt');
Vap.prototype.getUncleByBlockHashAndIndex = generateFnFor(1, 'vap_getUncleByBlockHashAndIndex');
Vap.prototype.getUncleByBlockNumberAndIndex = generateFnFor(1, 'vap_getUncleByBlockNumberAndIndex');
Vap.prototype.getCompilers = generateFnFor(1, 'vap_getCompilers');
Vap.prototype.compileLLL = generateFnFor(1, 'vap_compileLLL');
Vap.prototype.compileSolidity = generateFnFor(1, 'vap_compileSolidity');
Vap.prototype.compileSerpent = generateFnFor(1, 'vap_compileSerpent');
Vap.prototype.newFilter = generateFnFor(1, 'vap_newFilter');
Vap.prototype.newBlockFilter = generateFnFor(1, 'vap_newBlockFilter');
Vap.prototype.newPendingTransactionFilter = generateFnFor(1, 'vap_newPendingTransactionFilter');
Vap.prototype.uninstallFilter = generateFnFor(1, 'vap_uninstallFilter');
Vap.prototype.getFilterChanges = generateFnFor(1, 'vap_getFilterChanges');
Vap.prototype.getFilterLogs = generateFnFor(1, 'vap_getFilterLogs');
Vap.prototype.getLogs = generateFnFor(1, 'vap_getLogs');
Vap.prototype.getWork = generateFnFor(1, 'vap_getWork');
Vap.prototype.submitWork = generateFnFor(1, 'vap_submitWork');
Vap.prototype.submitHashrate = generateFnFor(1, 'vap_submitHashrate');

Vap.prototype.makeQuery = function (method, args) { // eslint-disable-line
  const self = this;

  self.query[method].apply(self.query, args);
};

function generateFnFor(length, method) {
  function outputMethod() {
    const self = this;
    const args = [].slice.call(arguments); // eslint-disable-line
    const cb = args.pop();
    const inputs = format.formatInputs(method, args);
    const queryMethod = method.replace('vap_', ''); // eslint-disable-line
    const callback = function(error, result) { // eslint-disable-line
      if (error) {
        cb(error, result);
      } else {
        try {
          cb(null, format.formatOutputs(method, result));
        } catch (formatError) {
          cb(`error while formatting data from the RPC: ${formatError}`, null);
        }
      }
    };

    inputs.push(callback);

    try {
      self.makeQuery(queryMethod, inputs);
    } catch (queryError) {
      cb(`error while querying the RPC provider: ${queryError}`, null);
    }
  }

  return outputMethod;
}
