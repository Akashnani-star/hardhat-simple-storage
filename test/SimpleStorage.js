const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage functions", () => {
    let simpleStorageFactory, simpleStorage
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
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
