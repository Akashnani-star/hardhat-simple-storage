const { task } = require("hardhat/config")
task("chain-id", "get chain id of the current network").setAction(
    async (taskArgs, hre) => {
        console.log(hre.network.config.chainId)
    }
)
