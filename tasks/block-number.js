const { task } = require("hardhat/config")

task("block-number", "get the latest block number from the ledger").setAction(
    async (taskArgs, hre) => {
        console.log(
            `Block number: ${await hre.ethers.provider.getBlockNumber()}`
        )
    }
)
