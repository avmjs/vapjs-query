## vapjs-query

<div>
  <!-- Dependency Status -->
  <a href="https://david-dm.org/vapjs/vapjs-query">
    <img src="https://david-dm.org/vapjs/vapjs-query.svg"
    alt="Dependency Status" />
  </a>

  <!-- devDependency Status -->
  <a href="https://david-dm.org/vapjs/vapjs-query#info=devDependencies">
    <img src="https://david-dm.org/vapjs/vapjs-query/dev-status.svg" alt="devDependency Status" />
  </a>

  <!-- Build Status -->
  <a href="https://travis-ci.org/vapjs/vapjs-query">
    <img src="https://travis-ci.org/vapjs/vapjs-query.svg"
    alt="Build Status" />
  </a>

  <!-- NPM Version -->
  <a href="https://www.npmjs.org/package/vapjs-query">
    <img src="http://img.shields.io/npm/v/vapjs-query.svg"
    alt="NPM version" />
  </a>

  <!-- Test Coverage -->
  <a href="https://coveralls.io/r/vapjs/vapjs-query">
    <img src="https://coveralls.io/repos/github/vapjs/vapjs-query/badge.svg" alt="Test Coverage" />
  </a>

  <!-- Javascript Style -->
  <a href="http://airbnb.io/javascript/">
    <img src="https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg" alt="js-airbnb-style" />
  </a>
</div>

<br />

A simple module for querying the Vapory RPC layer.

## Install

```
npm install --save vapjs-query
```

## Usage

```js
const BN = require('bn.js');
const HttpProvider = require('vapjs-provider-http');
const Vap = require('vapjs-query');
const vap = new Vap(new HttpProvider('http://localhost:8545'));

vap.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', cb);

// result null <BN ...>

vap.sendTransaction({
  from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
  to: '0x987d73d8a49eeb85d32cf462207dd71d50710033',
  value: new BN('6500000'),
  gas: 3000000,
  data: '0x',
}).then(cb).catch(cb);

// result null 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
```

## About

A simple Vapory RPC module for querying data from an Vapory node such as a gvap (go-vapory), parity (rust-vapory) or TestRPC (local js-vapory).

This module supports all Vapory RPC methods and is designed completely to specification.

## Amorphic Data Formatting

`vapjs-query` uses the `vapjs-format` module to format incoming and outgoing RPC data payloads. The primary formatting task is numbers. Number values can be inputed as: `BigNumber`, `BN`, `string`, `hex` or `actual numbers`. Because the blockchain does not support decimal or negative numbers, any kind of decimal or negative number will cause an error return. All received number values are returned as BN.js object instances.

Read more about the formatting layer here: [vapjs-format](http://github.com/vapjs/vapjs-format)

## Async Only

All methods are `async` only, requiring either a callback or promise.

## Error handling

Error handling is done through function callbacks or promised catches.

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

## Supported Methods

`vapjs-query` supports all Vapory specified RPC methods.

```js
const HttpProvider = require('vapjs-provider-http');
const Vap = require('vapjs-query');
const vap = new Vap(new HttpProvider('http://localhost:8545'));

vap.protocolVersion(cb);

// ....
```

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

## Contributing

Please help better the ecosystem by submitting issues and pull requests to `vapjs-query`. We need all the help we can get to build the absolute best linting standards and utilities. We follow the AirBNB linting standard and the unix philosophy.

## Guides

You'll find more detailed information on using `vapjs-query` and tailoring it to your needs in our guides:

- [User guide](docs/user-guide.md) - Usage, configuration, FAQ and complementary tools.
- [Developer guide](docs/developer-guide.md) - Contributing to `vapjs-query` and writing your own code and coverage.

## Help out

There is always a lot of work to do, and will have many rules to maintain. So please help out in any way that you can:

- Create, enhance, and debug vapjs rules (see our guide to ["Working on rules"](./github/CONTRIBUTING.md)).
- Improve documentation.
- Chime in on any open issue or pull request.
- Open new issues about your ideas for making `vapjs-query` better, and pull requests to show us how your idea works.
- Add new tests to *absolutely anything*.
- Create or contribute to ecosystem tools, like modules for encoding or contracts.
- Spread the word.

Please consult our [Code of Conduct](CODE_OF_CONDUCT.md) docs before helping out.

We communicate via [issues](https://github.com/vapjs/vapjs-query/issues) and [pull requests](https://github.com/vapjs/vapjs-query/pulls).

## Important documents

- [Changelog](CHANGELOG.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](https://raw.githubusercontent.com/vapjs/vapjs-query/master/LICENSE)

## Licence

This project is licensed under the MIT license, Copyright (c) 2016 Nick Dodson. For more information see LICENSE.md.

```
The MIT License

Copyright (c) 2016 Nick Dodson. nickdodson.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
