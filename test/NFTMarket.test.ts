import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { XenToken, AvengersNFT, NFTMarket } from "../src/types/contracts";
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Market Contract", () => {
    let addr1 : SignerWithAddress
    let addr2 : SignerWithAddress
    let addr3 : SignerWithAddress
    let addrs : SignerWithAddress[]
    let xenToken : XenToken
    let avengersNFT : AvengersNFT
    let nftMarket : NFTMarket

    beforeEach(async () => {
        [addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
        const xenFactory = await ethers.getContractFactory("XenToken")
        const avengersNFTFactory = await ethers.getContractFactory("AvengersNFT")
        const nftMarketFactory = await ethers.getContractFactory("NFTMarket")
        xenToken = (await xenFactory.deploy()) as XenToken
        avengersNFT = (await avengersNFTFactory.deploy()) as AvengersNFT
        nftMarket = (await nftMarketFactory.deploy(xenToken.address, avengersNFT.address)) as NFTMarket
    })

    describe("counstuctor", () => {
        it("should revert on non contract and zero address",async () => {
            const nftMarketFact = await ethers.getContractFactory("NFTMarket")
            await expect(nftMarketFact.deploy(addr1.address, avengersNFT.address)).to.be.revertedWith("TOKEN IS NOT A CONTRACT")
            await expect(nftMarketFact.deploy(ethers.constants.AddressZero, avengersNFT.address)).to.be.revertedWith("TOKEN IS NOT A CONTRACT")
            await expect(nftMarketFact.deploy(xenToken.address, addr2.address)).to.be.revertedWith("NFT IS NOT A CONTRACT")
            await expect(nftMarketFact.deploy(xenToken.address, ethers.constants.AddressZero)).to.be.revertedWith("NFT IS NOT A CONTRACT")
        })

        it("should set pay token address to Xen Token address",async () => {
            const payToken = await nftMarket.payToken()
            expect(payToken).to.equal(xenToken.address)
        })

        it("should set NFT address to AvengersNFT address",async () => {
            const nft = await nftMarket.NFT()
            expect(nft).to.equal(avengersNFT.address)
        })
    })

    describe("AvengersNFT mint(address _to)", () => {
        it("should let only owner of NFT collection to mint", async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await avengersNFT.mint(addr2.address)
            expect(await avengersNFT.ownerOf(2)).to.equal(addr2.address)
        })
        it("should not let address other than owner to mint",async () => {
            await expect(avengersNFT.connect(addr2).mint(addr2.address))
            .to.be.revertedWith("Ownable: caller is not the owner")
        })
    })

    describe("createNFTSale function", () => {
        it("should create a new sale",async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await avengersNFT.approve(nftMarket.address, 1)
            expect(await avengersNFT.getApproved(1)).to.equal(nftMarket.address)
            await nftMarket.createNFTSale(1, ethers.utils.parseEther("2"))
        })

        it("should revert on non exsting token id",async () => {
            await expect(avengersNFT.approve(nftMarket.address, 1))
            .to.be.revertedWith("ERC721: owner query for nonexistent token")
        })

        it("should revert if msg.sender is not token owner",async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await expect(nftMarket.connect(addr2).createNFTSale(1, ethers.utils.parseEther("2")))
            .to.be.revertedWith("NOT NFT OWNER")
        })

        it("should revert if sale price is zero",async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await expect(nftMarket.createNFTSale(1, ethers.utils.parseEther("0")))
            .to.be.revertedWith("NFT VALUE CANNOT BE ZERO")
        })
    })

    describe("removeNFTSale function", () => {
        it("should remove NFT from sale",async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await avengersNFT.approve(nftMarket.address, 1)
            expect(await avengersNFT.getApproved(1)).to.equal(nftMarket.address)
            await nftMarket.createNFTSale(1, ethers.utils.parseEther("2"))

            await nftMarket.removeNFTSale(1)
            await expect(nftMarket.buyNFT(1, ethers.utils.parseEther("2")))
            .to.be.revertedWith("NFT NOT ON SALE")
        })
        it("should revert if msg.sender is not token owner",async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await avengersNFT.approve(nftMarket.address, 1)
            expect(await avengersNFT.getApproved(1)).to.equal(nftMarket.address)
            await nftMarket.createNFTSale(1, ethers.utils.parseEther("2"))

            await expect(nftMarket.connect(addr2).removeNFTSale(1))
            .to.be.revertedWith("NOT NFT OWNER")
        })
        it("should revert if token not on sale",async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await expect(nftMarket.removeNFTSale(1))
            .to.be.revertedWith("NFT NOT ON SALE")
        })
    })

    describe("buyNFT function", () => {
        it("should let addr2 to buy NFT of addr1",async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await avengersNFT.approve(nftMarket.address, 1)
            expect(await avengersNFT.getApproved(1)).to.equal(nftMarket.address)
            await nftMarket.createNFTSale(1, ethers.utils.parseEther("2"))

            await xenToken.transfer(addr2.address, ethers.utils.parseEther("2"))
            await xenToken.connect(addr2).approve(nftMarket.address, ethers.utils.parseEther("2"))
            await nftMarket.connect(addr2).buyNFT(1, ethers.utils.parseEther("2"))
            expect(await avengersNFT.ownerOf(1)).to.equal(addr2.address)
        })

        it("should revert when owner tries to buy own NFT",async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await avengersNFT.approve(nftMarket.address, 1)
            expect(await avengersNFT.getApproved(1)).to.equal(nftMarket.address)
            await nftMarket.createNFTSale(1, ethers.utils.parseEther("2"))

            await expect(nftMarket.buyNFT(1, ethers.utils.parseEther("2")))
            .to.be.revertedWith("NFT OWNER")
        })

        it("should revert when quoted price is less than selling price",async () => {
            await avengersNFT.mint(addr1.address)
            expect(await avengersNFT.ownerOf(1)).to.equal(addr1.address)

            await avengersNFT.approve(nftMarket.address, 1)
            expect(await avengersNFT.getApproved(1)).to.equal(nftMarket.address)
            await nftMarket.createNFTSale(1, ethers.utils.parseEther("2"))

            await expect(nftMarket.connect(addr2).buyNFT(1, ethers.utils.parseEther("0")))
            .to.be.revertedWith("INSUFFICIENT PRICE")
        })
    })

    describe("setMintingFee function", () => {
        it("should set minting fee",async () => {
            expect(await nftMarket.mintingFee()).to.equal(ethers.utils.parseEther("1"))
            await nftMarket.setMintingFee(ethers.utils.parseEther("2"))
            expect(await nftMarket.mintingFee()).to.equal(ethers.utils.parseEther("2"))
        })
    })

})