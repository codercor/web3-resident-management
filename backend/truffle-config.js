require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { INFURA_API_KEY, MNEMONIC } = process.env;
console.log("INFURA_API_KEY: ", INFURA_API_KEY);
console.log("MNEMONIC: ", MNEMONIC);
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    _sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: "11155111",
      gas: 4465030,
      port : 443,
      timeoutBlocks: 500,
    },
  },
  compilers: {
    solc: {
      version: "0.8.13",
    }
  },
  db: {
    enabled: false,
    host: "127.0.0.1",
  }
};
