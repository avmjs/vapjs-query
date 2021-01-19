# User Guide

All information for developers using `vapjs-query` should consult this document.

## Install

```
npm install --save vapjs-query
```

## Usage

```js
const HttpProvider = require('vapjs-provider-http');
const Vap = require('vapjs-query');
const vap = new Vap(new HttpProvider('http://localhost:8545'));

vap.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', cb);

// result null <BigNumber ...>

vap.sendTransaction({
  from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
  to: '0x987d73d8a49eeb85d32cf462207dd71d50710033',
  gas: 300000,
  data: '0x',
}).then(cb).catch(cb);

// result null 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
```

## Debugging Options

`vapjs-query` comes equip with a full debug options for all data inputs and outputs.

```js
const HttpProvider = require('vapjs-provider-http');
const Vap = require('vapjs-query');
const vap = new Vap(new HttpProvider('http://localhost:8545'), { debug: true, logger: console, jsonSpace: 0 });

vap.accounts(cb);

/* result
[vapjs-query 2016-11-27T19:37:54.917Z] attempting method accounts with params [null]
[vapjs-query 2016-11-27T19:37:54.917Z] [method 'accounts'] callback provided: true
[vapjs-query 2016-11-27T19:37:54.917Z] [method 'accounts'] attempting input formatting of 0 inputs
[vapjs-query 2016-11-27T19:37:54.917Z] [method 'accounts'] formatted inputs: []
[vapjs-query 2016-11-27T19:37:54.917Z] [method 'accounts'] attempting query with formatted inputs...
[vapjs-query 2016-11-27T19:37:54.919Z] [method 'accounts'] callback success, attempting formatting of raw outputs: ["0xb88643569c19d05dc67b960f91d9d696eebf808e","0xf...]
[vapjs-query 2016-11-27T19:37:54.919Z] [method 'accounts'] formatted outputs: ["0xb88643569c19d05dc67b960f91d9d696eebf808e","0xf...]
*/
```

## Promise and Callbacks

`vapjs-query` supports both callbacks and promises for all RPC methods.

## Supported Methods

`vapjs-query` supports all Vapory spec RPC methods. Note, all `vap` RPC methods are attached as methods to the `Vap` object without the `vap_` prefix. All other methods (e.g. `web3_`, `net_` and `ssh_` etc.) require the full RPC method name (note, this policy may change in the future).

* [vap.protocolVersion](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_protocolversion)
* [vap.syncing](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_syncing)
* [vap.coinbase](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_coinbase)
* [vap.mining](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_mining)
* [vap.hashrate](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_hashrate)
* [vap.gasPrice](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_gasprice)
* [vap.accounts](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_accounts)
* [vap.blockNumber](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_blocknumber)
* [vap.getBalance](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getbalance)
* [vap.getStorageAt](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getstorageat)
* [vap.getTransactionCount](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_gettransactioncount)
* [vap.getBlockTransactionCountByHash](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getblocktransactioncountbyhash)
* [vap.getBlockTransactionCountByNumber](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getblocktransactioncountbynumber)
* [vap.getUncleCountByBlockHash](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getunclecountbyblockhash)
* [vap.getUncleCountByBlockNumber](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getunclecountbyblocknumber)
* [vap.getCode](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getcode)
* [vap.sign](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_sign)
* [vap.sendTransaction](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_sendtransaction)
* [vap.sendRawTransaction](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_sendrawtransaction)
* [vap.call](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_call)
* [vap.estimateGas](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_estimategas)
* [vap.getBlockByHash](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getblockbyhash)
* [vap.getBlockByNumber](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getblockbynumber)
* [vap.getTransactionByHash](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_gettransactionbyhash)
* [vap.getTransactionByBlockHashAndIndex](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_gettransactionbyblockhashandindex)
* [vap.getTransactionByBlockNumberAndIndex](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_gettransactionbyblocknumberandindex)
* [vap.getTransactionReceipt](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_gettransactionreceipt)
* [vap.getUncleByBlockHashAndIndex](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getunclebyblockhashandindex)
* [vap.getUncleByBlockNumberAndIndex](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getunclebyblocknumberandindex)
* [vap.getCompilers](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getcompilers)
* [vap.compileLLL](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_compilelll)
* [vap.compileSolidity](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_compilesolidity)
* [vap.compileSerpent](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_compileserpent)
* [vap.newFilter](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_newfilter)
* [vap.newBlockFilter](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_newblockfilter)
* [vap.newPendingTransactionFilter](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_newpendingtransactionfilter)
* [vap.uninstallFilter](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_uninstallfilter)
* [vap.getFilterChanges](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getfilterchanges)
* [vap.getFilterLogs](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getfilterlogs)
* [vap.getLogs](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getlogs)
* [vap.getWork](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_getwork)
* [vap.submitWork](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_submitwork)
* [vap.submitHashrate](https://github.com/vaporyco/wiki/wiki/JSON-RPC#vap_submithashrate)

* [vap.web3_clientVersion](https://github.com/vaporyco/wiki/wiki/JSON-RPC#web3_clientversion)
* [vap.web3_sha3](https://github.com/vaporyco/wiki/wiki/JSON-RPC#web3_sha3)

* [vap.net_version](https://github.com/vaporyco/wiki/wiki/JSON-RPC#net_version)
* [vap.net_peerCount](https://github.com/vaporyco/wiki/wiki/JSON-RPC#net_peercount)
* [vap.net_listening](https://github.com/vaporyco/wiki/wiki/JSON-RPC#net_listening)

* [vap.db_putString](https://github.com/vaporyco/wiki/wiki/JSON-RPC#db_putstring)
* [vap.db_getString](https://github.com/vaporyco/wiki/wiki/JSON-RPC#db_getstring)
* [vap.db_putHex](https://github.com/vaporyco/wiki/wiki/JSON-RPC#db_puthex)
* [vap.db_getHex](https://github.com/vaporyco/wiki/wiki/JSON-RPC#db_gethex)

* [vap.shh_post](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_post)
* [vap.shh_version](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_version)
* [vap.shh_newIdentity](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_newidentity)
* [vap.shh_hasIdentity](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_hasidentity)
* [vap.shh_newGroup](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_newgroup)
* [vap.shh_addToGroup](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_addtogroup)
* [vap.shh_newFilter](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_newfilter)
* [vap.shh_uninstallFilter](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_uninstallfilter)
* [vap.shh_getFilterChanges](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_getfilterchanges)
* [vap.shh_getMessages](https://github.com/vaporyco/wiki/wiki/JSON-RPC#shh_getmessages)

## Why BN.js?

`vapjs` has made a policy of using `BN.js` across all of its repositories. Here are some of the reasons why:

  1. lighter than alternatives (BigNumber.js)
  2. faster than most alternatives, see [benchmarks](https://github.com/indutny/bn.js/issues/89)
  3. used by the Vapory foundation across all [`vaporyjs`](https://github.com/vaporycojs) repositories
  4. is already used by a critical JS dependency of many vapory packages, see package [`elliptic`](https://github.com/indutny/elliptic)
  5. purposefully **does not support decimals or floats numbers** (for greater precision), remember, the Vapory blockchain cannot and will not support float values or decimal numbers.

## Browser Builds

`vapjs` provides production distributions for all of its modules that are ready for use in the browser right away. Simply include either `dist/vapjs-query.js` or `dist/vapjs-query.min.js` directly into an HTML file to start using this module. Note, an `Vap` object is made available globally.

```html
<script type="text/javascript" src="vapjs-query.min.js"></script>
<script type="text/javascript">
new Vap(...);
</script>
```

Note, even though `vapjs` should have transformed and polyfilled most of the requirements to run this module across most modern browsers. You may want to look at an additional polyfill for extra support.

Use a polyfill service such as `Polyfill.io` to ensure complete cross-browser support:
https://polyfill.io/

## Other Awesome Modules, Tools and Frameworks

 - [web3.js](https://github.com/vaporyco/web3.js) -- the original Vapory swiss army knife **Vapory Foundation**
 - [vaporyjs](https://github.com/vaporycojs) -- critical vaporyjs infrastructure **Vapory Foundation**
 - [browser-solidity](https://vapory.github.io/browser-solidity) -- an in browser Solidity IDE **Vapory Foundation**
 - [wafr](https://github.com/silentcicero/wafr) -- a super simple Solidity testing framework
 - [truffle](https://github.com/ConsenSys/truffle) -- a solidity/js dApp framework
 - [embark](https://github.com/iurimatias/embark-framework) -- a solidity/js dApp framework
 - [dapple](https://github.com/nexusdev/dapple) -- a solidity dApp framework
 - [chaitherium](https://github.com/SafeMarket/chaithereum) -- a JS web3 unit testing framework
 - [contest](https://github.com/DigixGlobal/contest) -- a JS testing framework for contracts

## Our Relationship with Vapory & VaporyJS

 We would like to mention that we are not in any way affiliated with the Vapory Foundation or `vaporyjs`. However, we love the work they do and work with them often to make Vapory great! Our aim is to support the Vapory ecosystem with a policy of diversity, modularity, simplicity, transparency, clarity, optimization and extensibility.

 Many of our modules use code from `web3.js` and the `vaporyjs-` repositories. We thank the authors where we can in the relevant repositories. We use their code carefully, and make sure all test coverage is ported over and where possible, expanded on.
