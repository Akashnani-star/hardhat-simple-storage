import { task } from "hardhat/config"

task(
    "accounts-balance",
    "get accounts balance in the current provider"
).setAction(async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()
    for (const account of accounts) {
        const address = await account.getAddress()
        const balance = await account.getBalance()
        console.log(
            `Account ${address} contains ${(
                parseInt(balance.toString()) * 1e-18
            )
                .toString()
                .slice(0, 4)} ETH`
        )
    }
})
