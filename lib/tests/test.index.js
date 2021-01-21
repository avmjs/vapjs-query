'use strict';

var Vap = require('../index.js');
var Vap2 = require('../index.js');
var assert = require('chai').assert;
var util = require('vapjs-util');
var TestRPC = require('vaporyjs-testrpc');
var BigNumber = require('bn.js');
var abi = require('vapjs-abi');
var provider = TestRPC.provider({});

describe('vapjs-query', function () {
  describe('construction', function () {
    it('should construct normally', function () {
      var vap = new Vap(provider);

      assert.equal(typeof vap, 'object');
      assert.equal(typeof vap.accounts, 'function');
      assert.equal(typeof vap.getBalance, 'function');
      assert.equal(typeof vap.sendTransaction, 'function');
      assert.equal(typeof vap.sendRawTransaction, 'function');
    });

    it('should construct normally with non Vap name', function () {
      var vap = new Vap2(provider);

      assert.equal(typeof vap, 'object');
      assert.equal(typeof vap.accounts, 'function');
      assert.equal(typeof vap.getBalance, 'function');
      assert.equal(typeof vap.sendTransaction, 'function');
      assert.equal(typeof vap.sendRawTransaction, 'function');
    });

    it('should fail when provider is not valid', function (done) {
      try {
        var vap = new Vap(''); // eslint-disable-line
      } catch (error) {
        assert.equal(typeof error, 'object');
        done();
      }
    });

    it('should fail when provider is not valid', function (done) {
      try {
        var vap = new Vap(342323); // eslint-disable-line
      } catch (error) {
        assert.equal(typeof error, 'object');
        done();
      }
    });

    it('debugger should function', function (done) {
      var vap = new Vap(provider, { debug: true, logger: { log: function log(message) {
            assert.equal(typeof message, 'string');
          } } }); // eslint-disable-line

      vap.accounts(function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);
        done();
      });
    });

    it('should fail with response error payload', function (done) {
      var vap = new Vap({
        sendAsync: function sendAsync(opts, cb) {
          cb(false, { error: 'bad data..' });
        }
      }); // eslint-disable-line

      vap.accounts(function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);
        done();
      });
    });

    it('should fail with invalid payload response (formatting error)', function (done) {
      var vap = new Vap({
        sendAsync: function sendAsync(opts, cb) {
          cb(false, { result: [38274978, 983428943] });
        }
      }); // eslint-disable-line

      vap.accounts(function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);
        done();
      });
    });

    it('should fail with invalid method input (formatting error)', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.getBalance(234842387, function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);
        done();
      });
    });

    it('should fail when no new flag is present', function (done) {
      try {
        var vap = Vap2(provider); // eslint-disable-line
      } catch (error) {
        assert.equal(typeof error, 'object');
        done();
      }
    });

    it('should fail nicely when too little params on getBalance', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.getBalance(function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);

        done();
      });
    });

    it('should fail nicely when too many paramsEncoded on getBalance', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.getBalance('fsdfsd', 'sdffsd', 'dsfdfssf', function (error, result) {
        assert.equal(typeof error, 'object');
        assert.equal(result, null);

        done();
      });
    });

    it('should check if the rpc is vap_syncing', function (done) {
      var vap = new Vap(provider);

      vap.syncing(function (err, result) {
        assert.equal(err, null);
        assert.equal(typeof result, 'boolean');

        done();
      });
    });

    it('should function while vap_coinbase', function (done) {
      var vap = new Vap(provider);

      vap.coinbase(function (err, result) {
        assert.equal(err, null);
        assert.equal(typeof result, 'string');
        assert.equal(util.getBinarySize(result), 42);

        done();
      });
    });

    it('should function while vap_coinbase using promise', function (done) {
      var vap = new Vap(provider);

      vap.coinbase().then(function (result) {
        assert.equal(typeof result, 'string');
        assert.equal(util.getBinarySize(result), 42);

        done();
      })['catch'](function (err) {
        assert.equal(err, null);
      });
    });

    it('should get acconts with promise', function (done) {
      var vap = new Vap(provider);

      vap.accounts().then(function (result) {
        assert.equal(typeof result, 'object');
        assert.equal(result.length > 0, true);

        done();
      })['catch'](function (err) {
        assert.equal(err, null);
      });
    });

    it('should reject bad getBalance call with an error', function (done) {
      var vap = new Vap(provider);

      vap.accounts(function (accountsError, accounts) {
        vap.sendTransaction({
          from: accounts[0],
          to: accounts[1],
          gas: 10,
          value: 100000,
          data: '0x'
        })['catch'](function (err) {
          assert.equal(typeof err, 'object');
          done();
        });
      });
    });

    it('should function while vap_getBalance using promise', function (done) {
      var vap = new Vap(provider);

      vap.coinbase().then(function (result) {
        assert.equal(typeof result, 'string');
        assert.equal(util.getBinarySize(result), 42);

        vap.getBalance(result).then(function (balance) {
          assert.equal(typeof balance, 'object');

          done();
        })['catch'](function (err) {
          assert.equal(err, null);
        });
      })['catch'](function (err) {
        assert.equal(err, null);
      });
    });

    it('should function while vap_getBalance, optional and non optional latest', function (done) {
      var vap = new Vap(provider);

      vap.coinbase(function (err, coinbase) {
        assert.equal(err, null);
        assert.equal(typeof coinbase, 'string');
        assert.equal(util.getBinarySize(coinbase), 42);

        vap.getBalance(coinbase, function (balanceError, balance) {
          assert.equal(balanceError, null);
          assert.equal(typeof balance, 'object');

          vap.getBalance(coinbase, 'latest', function (balanceLatestError, balanceLatest) {
            assert.equal(balanceLatestError, null);
            assert.equal(typeof balanceLatest, 'object');
            assert.equal(balance.toString(10), balanceLatest.toString(10));

            done();
          });
        });
      });
    });

    it('should function while get_accounts', function (done) {
      var vap = new Vap(provider);

      vap.accounts(function (err, result) {
        assert.equal(err, null);
        assert.equal(typeof result, 'object');
        assert.equal(Array.isArray(result), true);
        assert.equal(result.length > 0, true);
        assert.equal(typeof result[0], 'string');
        assert.equal(util.getBinarySize(result[0]), 42);

        done();
      });
    });

    it('should function while vap_blockNumber', function (done) {
      var vap = new Vap(provider);

      vap.blockNumber(function (err, result) {
        assert.equal(err, null);
        assert.equal(typeof result, 'object');
        assert.equal(result.toNumber() >= 0, true);
        done();
      });
    });

    it('should function while vap_compileSolidity', function (done) {
      var vap = new Vap(provider);
      var testSolidity = 'pragma solidity ^0.4.0;\n\n      /// @title Voting with delegation.\n      contract Ballot {\n        function () payable {\n        }\n\n        uint cool;\n      }\n      ';

      vap.compileSolidity(testSolidity, function (err, result) {
        assert.equal(err, null);
        assert.equal(typeof result, 'object');
        assert.equal(typeof result.code, 'string');
        assert.equal(typeof result.info, 'object');
        assert.equal(result.info.language, 'Solidity');
        done();
      });
    });

    it('should function while vap_estimateGas', function (done) {
      var vap = new Vap(provider);
      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        var testTransactionObject = {
          from: accounts[0],
          to: accounts[4],
          gas: new BigNumber(23472),
          gasPrice: '92384242',
          data: '0x'
        };

        vap.estimateGas(testTransactionObject, function (err, result) {
          assert.equal(err, null);
          assert.equal(typeof result, 'object');
          assert.equal(typeof result.toString(10), 'string');
          assert.equal(result.toNumber(10) > 0, true);
          done();
        });
      });
    });

    it('should function while vap_gasPrice', function (done) {
      var vap = new Vap(provider);

      vap.gasPrice(function (err, result) {
        assert.equal(err, null);
        assert.equal(typeof result, 'object');
        assert.equal(result.toNumber() > 0, true);
        done();
      });
    });

    it('should function while vap_getBalance', function (done) {
      var vap = new Vap(provider);

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        vap.getBalance(accounts[0], function (err, result) {
          assert.equal(err, null);
          assert.equal(typeof result, 'object');
          assert.equal(result.gt(0), true);

          vap.getBalance(accounts[0], 'latest', function (err2, result2) {
            assert.equal(err2, null);
            assert.equal(typeof result2, 'object');
            assert.equal(result2.gt(0), true);
            done();
          });
        });
      });
    });

    it('should function while vap_getBlockByNumber', function (done) {
      // eslint-disable-line
      var vap = new Vap(provider);

      vap.getBlockByNumber(0, true, function (blockError, result) {
        assert.equal(blockError, null);
        assert.equal(typeof result, 'object');
        assert.equal(util.getBinarySize(result.hash), 66);
        assert.equal(util.getBinarySize(result.sha3Uncles), 66);
        assert.equal(util.getBinarySize(result.parentHash), 66);
        assert.equal(result.size.toNumber(10) > 0, true);
        assert.equal(result.gasLimit.toNumber(10) > 0, true);
        assert.equal(result.timestamp.toNumber(10) > 0, true);
        done();
      });
    });

    it('should function while vap_getBlockByHash', function (done) {
      var vap = new Vap(provider);

      vap.getBlockByNumber(0, true, function (blockError, block) {
        assert.equal(blockError, null);
        assert.equal(typeof block, 'object');

        vap.getBlockByHash(block.hash, true, function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'object');
          assert.equal(util.getBinarySize(result.hash), 66);
          assert.equal(util.getBinarySize(result.sha3Uncles), 66);
          assert.equal(util.getBinarySize(result.parentHash), 66);
          assert.equal(result.size.toNumber(10) > 0, true);
          assert.equal(result.gasLimit.toNumber(10) > 0, true);
          assert.equal(result.timestamp.toNumber(10) > 0, true);
          done();
        });
      });
    });

    it('should function while vap_getCode', function (done) {
      var vap = new Vap(provider); // eslint-disable-line
      done();
    });

    it('should function while vap_getCompilers', function (done) {
      /*
      const vap = new Vap(provider); // eslint-disable-line
       vap.getCompilers((compilerError, compilerResilt) => {
        console.log(compilerError, compilerResilt);
         // assert.equal(error, null);
        // assert.equal(typeof result, 'object');
        // assert.equal(Array.isArray(result), true);
        // assert.equal(typeof result[0], 'string');
         done();
      }); */
      done();
    });

    it('should function while vap_hashrate', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.hashrate(function (error, result) {
        assert.equal(error, null);
        assert.equal(typeof result, 'object');
        assert.equal(result.toNumber(10) >= 0, true);

        done();
      });
    });

    it('should function while vap_mining', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.mining(function (error, result) {
        assert.equal(error, null);
        assert.equal(typeof result, 'boolean');

        done();
      });
    });

    it('should function while vap_getTransactionCount', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        vap.getTransactionCount(accounts[0], function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'object');
          assert.equal(result.toNumber(10) >= 0, true);

          done();
        });
      });
    });

    it('should function while vap_getTransactionByBlockHashAndIndex', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        var testTransaction = {
          from: accounts[0],
          to: accounts[2],
          gas: 3000000,
          data: '0x'
        };

        vap.sendTransaction(testTransaction, function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'string');
          assert.equal(util.getBinarySize(result), 66);

          vap.getTransactionReceipt(result, function (receiptError, receipt) {
            assert.equal(receiptError, null);
            assert.equal(typeof receipt, 'object');

            vap.getTransactionByBlockHashAndIndex(receipt.blockHash, 0, function (blockError, block) {
              assert.equal(blockError, null);
              assert.equal(typeof block, 'object');
              assert.equal(util.getBinarySize(block.blockHash), 66);
              assert.equal(block.gas.toNumber(10) >= 0, true);
              assert.equal(block.gasPrice.toNumber(10) >= 0, true);
              assert.equal(block.transactionIndex.toNumber(10) >= 0, true);
              assert.equal(block.blockNumber.toNumber(10) >= 0, true);

              done();
            });
          });
        });
      });
    });

    it('should function while vap_getTransactionByBlockNumberAndIndex', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        var testTransaction = {
          from: accounts[0],
          to: accounts[2],
          gas: 3000000,
          data: '0x'
        };

        vap.sendTransaction(testTransaction, function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'string');
          assert.equal(util.getBinarySize(result), 66);

          vap.getTransactionReceipt(result, function (receiptError, receipt) {
            assert.equal(receiptError, null);
            assert.equal(typeof receipt, 'object');

            vap.getTransactionByBlockNumberAndIndex(2, 0, function (blockError, block) {
              assert.equal(blockError, null);
              assert.equal(typeof block, 'object');
              assert.equal(util.getBinarySize(block.blockHash), 66);
              assert.equal(block.gas.toNumber(10) >= 0, true);
              assert.equal(block.gasPrice.toNumber(10) >= 0, true);
              assert.equal(block.transactionIndex.toNumber(10) >= 0, true);
              assert.equal(block.blockNumber.toNumber(10) >= 0, true);

              done();
            });
          });
        });
      });
    });

    it('should function while vap_sendTransaction', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        var testTransaction = {
          from: accounts[0],
          to: accounts[2],
          gas: 3000000,
          data: '0x'
        };

        vap.sendTransaction(testTransaction, function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'string');
          assert.equal(util.getBinarySize(result), 66);

          done();
        });
      });
    });

    it('should function while vap_sendTransaction with contract', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        var testTransaction = {
          from: accounts[0],
          gas: '3000000',
          data: '606060405234610000575b61016a806100186000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063119c56bd1461004e57806360fe47b11461008e5780636d4ce63c146100c1575b610000565b346100005761005b6100e4565b604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b34610000576100a960048080359060200190919050506100f5565b60405180821515815260200191505060405180910390f35b34610000576100ce61015f565b6040518082815260200191505060405180910390f35b60006000610d7d91503390505b9091565b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056'
        };

        vap.sendTransaction(testTransaction, function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'string');
          assert.equal(util.getBinarySize(result), 66);

          done();
        });
      });
    });

    it('should function while vap_sign', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        var testTxData = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

        vap.sign(accounts[0], testTxData, function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'string');
          assert.equal(util.getBinarySize(result) > 0, true);

          done();
        });
      });
    });

    it('should function while vap_getTransactionReceipt', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        var testTransaction = {
          from: accounts[0],
          to: accounts[2],
          gas: 3000000,
          data: '0x'
        };

        vap.sendTransaction(testTransaction, function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'string');
          assert.equal(util.getBinarySize(result), 66);

          setTimeout(function () {
            vap.getTransactionReceipt(result, function (receiptError, receipt) {
              assert.equal(receiptError, null);
              assert.equal(typeof receipt, 'object');

              assert.equal(util.getBinarySize(receipt.transactionHash), 66);
              assert.equal(receipt.transactionIndex.toNumber(10) >= 0, true);
              assert.equal(receipt.blockNumber.toNumber(10) >= 0, true);
              assert.equal(receipt.cumulativeGasUsed.toNumber(10) >= 0, true);
              assert.equal(receipt.gasUsed.toNumber(10) >= 0, true);
              assert.equal(Array.isArray(receipt.logs), true);

              done();
            });
          }, 340);
        });
      });
    });

    it('should function while deploy, use contract via vap_call, vap_getCode', function (done) {
      var vap = new Vap(provider); // eslint-disable-line

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        var testContractTransaction = {
          from: accounts[0],
          gas: 3000000,
          data: '606060405234610000575b61016a806100186000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063119c56bd1461004e57806360fe47b11461008e5780636d4ce63c146100c1575b610000565b346100005761005b6100e4565b604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b34610000576100a960048080359060200190919050506100f5565b60405180821515815260200191505060405180910390f35b34610000576100ce61015f565b6040518082815260200191505060405180910390f35b60006000610d7d91503390505b9091565b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056'
        };

        var contractABI = [{ 'constant': false, 'inputs': [], 'name': 'setcompeltereturn', 'outputs': [{ 'name': '_newValue', 'type': 'uint256' }, { 'name': '_sender', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_value', 'type': 'uint256' }], 'name': 'set', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'get', 'outputs': [{ 'name': 'storeValue', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'anonymous': false, 'inputs': [{ 'indexed': false, 'name': '_newValue', 'type': 'uint256' }, { 'indexed': false, 'name': '_sender', 'type': 'address' }], 'name': 'SetComplete', 'type': 'event' }]; // eslint-disable-line

        vap.sendTransaction(testContractTransaction, function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'string');
          assert.equal(util.getBinarySize(result), 66);

          setTimeout(function () {
            vap.getTransactionReceipt(result, function (receiptError, receipt) {
              assert.equal(receiptError, null);
              assert.equal(typeof receipt, 'object');

              assert.equal(util.getBinarySize(receipt.transactionHash), 66);
              assert.equal(receipt.transactionIndex.toNumber(10) >= 0, true);
              assert.equal(receipt.blockNumber.toNumber(10) >= 0, true);
              assert.equal(receipt.cumulativeGasUsed.toNumber(10) >= 0, true);
              assert.equal(receipt.gasUsed.toNumber(10) >= 0, true);
              assert.equal(Array.isArray(receipt.logs), true);
              assert.equal(typeof receipt.contractAddress, 'string');

              var uintValue = 350000;
              var setMethodTransaction = {
                from: accounts[0],
                to: receipt.contractAddress,
                gas: 3000000,
                data: abi.encodeMethod(contractABI[1], [uintValue])
              };

              vap.sendTransaction(setMethodTransaction, function (setMethodError, setMethodTx) {
                assert.equal(setMethodError, null);
                assert.equal(typeof setMethodTx, 'string');
                assert.equal(util.getBinarySize(setMethodTx), 66);

                setTimeout(function () {
                  var callMethodTransaction = {
                    to: receipt.contractAddress,
                    data: abi.encodeMethod(contractABI[2], [])
                  };

                  vap.call(callMethodTransaction, function (callError, callResult) {
                    // eslint-disable-line
                    assert.equal(setMethodError, null);
                    var decodedUint = abi.decodeMethod(contractABI[2], callResult);

                    assert.equal(decodedUint[0].toNumber(10), uintValue);

                    vap.getCode(receipt.contractAddress, 'latest', function (codeError, codeResult) {
                      assert.equal(codeError, null);
                      assert.equal(typeof codeResult, 'string');

                      done();
                    });
                  });
                }, 400);
              });
            });
          }, 1000);
        });
      });
    });

    it('should function while deploy, use contract via vap_call, vap_getCode with debug, logger', function (done) {
      var vap = new Vap(provider, { debug: true, logger: { log: function log() {} }, jsonSpace: 2 }); // eslint-disable-line

      vap.accounts(function (accountsError, accounts) {
        assert.equal(accountsError, null);
        assert.equal(typeof accounts, 'object');

        var testContractTransaction = {
          from: accounts[0],
          gas: 3000000,
          data: '606060405234610000575b61016a806100186000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063119c56bd1461004e57806360fe47b11461008e5780636d4ce63c146100c1575b610000565b346100005761005b6100e4565b604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b34610000576100a960048080359060200190919050506100f5565b60405180821515815260200191505060405180910390f35b34610000576100ce61015f565b6040518082815260200191505060405180910390f35b60006000610d7d91503390505b9091565b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056'
        };

        var contractABI = [{ 'constant': false, 'inputs': [], 'name': 'setcompeltereturn', 'outputs': [{ 'name': '_newValue', 'type': 'uint256' }, { 'name': '_sender', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_value', 'type': 'uint256' }], 'name': 'set', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'get', 'outputs': [{ 'name': 'storeValue', 'type': 'uint256' }], 'payable': false, 'type': 'function' }, { 'anonymous': false, 'inputs': [{ 'indexed': false, 'name': '_newValue', 'type': 'uint256' }, { 'indexed': false, 'name': '_sender', 'type': 'address' }], 'name': 'SetComplete', 'type': 'event' }]; // eslint-disable-line

        vap.sendTransaction(testContractTransaction, function (error, result) {
          assert.equal(error, null);
          assert.equal(typeof result, 'string');
          assert.equal(util.getBinarySize(result), 66);

          setTimeout(function () {
            vap.getTransactionReceipt(result, function (receiptError, receipt) {
              assert.equal(receiptError, null);
              assert.equal(typeof receipt, 'object');

              assert.equal(util.getBinarySize(receipt.transactionHash), 66);
              assert.equal(receipt.transactionIndex.toNumber(10) >= 0, true);
              assert.equal(receipt.blockNumber.toNumber(10) >= 0, true);
              assert.equal(receipt.cumulativeGasUsed.toNumber(10) >= 0, true);
              assert.equal(receipt.gasUsed.toNumber(10) >= 0, true);
              assert.equal(Array.isArray(receipt.logs), true);
              assert.equal(typeof receipt.contractAddress, 'string');

              var uintValue = 350000;
              var setMethodTransaction = {
                from: accounts[0],
                to: receipt.contractAddress,
                gas: 3000000,
                data: abi.encodeMethod(contractABI[1], [uintValue])
              };

              vap.sendTransaction(setMethodTransaction, function (setMethodError, setMethodTx) {
                assert.equal(setMethodError, null);
                assert.equal(typeof setMethodTx, 'string');
                assert.equal(util.getBinarySize(setMethodTx), 66);

                setTimeout(function () {
                  var callMethodTransaction = {
                    to: receipt.contractAddress,
                    data: abi.encodeMethod(contractABI[2], [])
                  };

                  vap.call(callMethodTransaction, function (callError, callResult) {
                    // eslint-disable-line
                    assert.equal(setMethodError, null);
                    var decodedUint = abi.decodeMethod(contractABI[2], callResult);

                    assert.equal(decodedUint[0].toNumber(10), uintValue);

                    vap.getCode(receipt.contractAddress, 'latest', function (codeError, codeResult) {
                      assert.equal(codeError, null);
                      assert.equal(typeof codeResult, 'string');

                      done();
                    });
                  });
                }, 400);
              });
            });
          }, 1000);
        });
      });
    });
  });
});