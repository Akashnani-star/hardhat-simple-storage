import { ethers, run, network } from "hardhat"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

async function main() {
    const SimpleStorageFactory: SimpleStorage__factory =
        (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory
    console.log("Deploying contract...")
    const simpleStorage: SimpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Contract Deployed at : ${simpleStorage.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    let transactionResponse = await simpleStorage.addUserFavoriteNumber(
        "akash",
        3
    )
    await transactionResponse.wait(1)
    let akashFavoriteNumber = await simpleStorage.getUserFavoriteNumber("akash")
    console.log(akashFavoriteNumber.toString())
    transactionResponse = await simpleStorage.addUserFavoriteNumber("akash", 18)
    await transactionResponse.wait(1)
    akashFavoriteNumber = await simpleStorage.getUserFavoriteNumber("akash")
    console.log(akashFavoriteNumber.toString())
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
