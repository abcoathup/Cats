require('babel-register');
require('babel-polyfill');
require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

const infuraUrl = network => `https://${network}.infura.io/${process.env.INFURA_API_KEY}`;

const infuraProvider = network => providerWithMnemonic(
  process.env.MNEMONIC || '',
  infuraUrl(network)
);

const ropstenProvider = process.env.SOLIDITY_COVERAGE
  ? undefined
  : infuraProvider('ropsten');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
    },
    ropsten: {
      provider: ropstenProvider,
      network_id: 3, // eslint-disable-line camelcase
      gas: 4000000,  // default 4712388 is too high
      gasPrice:1000000000,
    },
    live: {
      provider: providerWithMnemonic(process.env.MAINNET_MNEMONIC, infuraUrl('mainnet')),
      network_id: 1, // eslint-disable-line camelcase
      gasPrice:1000000000,
    },
    coverage: {
      host: 'localhost',
      port: 8555,
      network_id: '*', // eslint-disable-line camelcase
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },    
    ganache: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
    },
  },
};