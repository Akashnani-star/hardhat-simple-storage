import { ethers } from "hardhat"
import { assert, expect } from "chai"
import { SimpleStorage__factory, SimpleStorage } from "../typechain-types"

describe("SimpleStorage functions", () => {
    let SimpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage
    beforeEach(async () => {
        SimpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory
        simpleStorage = await SimpleStorageFactory.deploy()
        await simpleStorage.deployTransaction.wait(1)
    })
    it("should have akashFavoriteNumber starting as 0", async () => {
        const currentAkashFavorite = await simpleStorage.getUserFavoriteNumber(
            "akash"
        )
        const expectedValue = "0"
        assert.strictEqual(
            currentAkashFavorite.toString(),
            expectedValue,
            `${currentAkashFavorite.toString()} != ${expectedValue}`
        )
    })
    it("should update to 3 when akashFavoriteNumber is set to 3", async () => {
        const tx = await simpleStorage.addUserFavoriteNumber("akash", "3")
        await tx.wait(1)
        const currentAkashFavorite = await simpleStorage.getUserFavoriteNumber(
            "akash"
        )
        const expectedValue = "3"
        assert.equal(currentAkashFavorite.toString(), expectedValue)
        describe("testing updated values", () => {
            it("should have 3 as akashFavoriteNumber", async () => {
                const currentAkashFavorite =
                    await simpleStorage.getUserFavoriteNumber("akash")
                const expectedValue = "3"
                assert.equal(currentAkashFavorite.toString(), expectedValue)
            })
        })
    })
})
