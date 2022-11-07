require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("./tasks/get-accounts")
require("./tasks/get-chain-id")
require("hardhat-gas-reporter")
require("solidity-coverage")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const HARDHAT_RPC_URL = process.env.HARDHAT_RPC_URL
const HARDHAT_PRIVATE_KEY = process.env.HARDHAT_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [GOERLI_PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: HARDHAT_RPC_URL,
            accounts: [HARDHAT_PRIVATE_KEY],
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-reporter.txt",
        noColors: true,
        // currency: "INR",
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY
    },
    solidity: "0.8.8",
}
