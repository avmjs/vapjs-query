## vapjs-query

<div>
  <!-- Dependency Status -->
  <a href="https://david-dm.org/SilentCicero/vapjs-query">
    <img src="https://david-dm.org/SilentCicero/vapjs-query.svg"
    alt="Dependency Status" />
  </a>

  <!-- devDependency Status -->
  <a href="https://david-dm.org/SilentCicero/vapjs-query#info=devDependencies">
    <img src="https://david-dm.org/SilentCicero/vapjs-query/dev-status.svg" alt="devDependency Status" />
  </a>

  <!-- Build Status -->
  <a href="https://travis-ci.org/SilentCicero/vapjs-query">
    <img src="https://travis-ci.org/SilentCicero/vapjs-query.svg"
    alt="Build Status" />
  </a>

  <!-- NPM Version -->
  <a href="https://www.npmjs.org/package/vapjs-query">
    <img src="http://img.shields.io/npm/v/vapjs-query.svg"
    alt="NPM version" />
  </a>

  <!-- Javascript Style -->
  <a href="http://airbnb.io/javascript/">
    <img src="https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg" alt="js-airbnb-style" />
  </a>
</div>

<br />

A simple wrapper around the `vap-query` module with formatting for numbers, hex value and data structures.

## Install

```
npm install --save vapjs-query
```

## Usage

```js
const Vap = require('vapjs-query');
const vap = new Vap(providerObject);

vap.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', cb);

// result null <BigNumber ...>

vap.sendTransaction({
  from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
  to: '0x987d73d8a49eeb85d32cf462207dd71d50710033',
  gas: 300000,
  data: '0x',
}, cb);

// result null 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
```

## About

A simple wrapper around the `vap-query` module using the `vapjs-format` as a formatting layer.

## Supported Mvapods

```
getBalance
getCode
getTransactionCount
getStorageAt
call
protocolVersion
syncing
coinbase
mining
hashrate
gasPrice
accounts
blockNumber
getBlockTransactionCountByHash
getBlockTransactionCountByNumber
getUncleCountByBlockHash
getUncleCountByBlockNumber
sign
sendTransaction
sendRawTransaction
estimateGas
getBlockByHash
getBlockByNumber
getTransactionByHash
getTransactionByBlockHashAndIndex
getTransactionByBlockNumberAndIndex
getTransactionReceipt
getUncleByBlockHashAndIndex
getUncleByBlockNumberAndIndex
getCompilers
compileLLL
compileSolidity
compileSerpent
newFilter
newBlockFilter
newPendingTransactionFilter
uninstallFilter
getFilterChanges
getFilterLogs
getLogs
getWork
submitWork
submitHashrate
```

## Contributing

Please help better the ecosystem by submitting issues and pull requests to default. We need all the help we can get to build the absolute best linting standards and utilities. We follow the AirBigNumberB linting standard. Please read more about contributing to `vapjs-query` in the `CONTRIBUTING.md`.

<!--
## Guides

You'll find more detailed information on using default and tailoring it to your needs in our guides:

- [User guide](docs/user-guide.md) - Usage, configuration, FAQ and complementary tools.
- [Developer guide](docs/developer-guide.md) - Contributing to wafr and writing your own plugins & formatters.
-->

## Help out

There is always a lot of work to do, and will have many rules to maintain. So please help out in any way that you can:

<!-- - Create, enhance, and debug rules (see our guide to ["Working on rules"](./github/CONTRIBUTING.md)). -->
- Improve documentation.
- Chime in on any open issue or pull request.
- Open new issues about your ideas for making stylelint better, and pull requests to show us how your idea works.
- Add new tests to *absolutely anything*.
- Create or contribute to ecosystem tools, like the plugins for Atom and Sublime Text.
- Spread the word.

Please consult our [Code of Conduct](CODE_OF_CONDUCT.md) docs before helping out.

We communicate via [issues](https://github.com/SilentCicero/vapjs-query/issues) and [pull requests](https://github.com/SilentCicero/vapjs-query/pulls).

## Important documents

- [Changelog](CHANGELOG.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](https://raw.githubusercontent.com/SilentCicero/vapjs-query/master/LICENSE)

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

## Original Port Author

Richard Moore <me@ricmoo.com>
