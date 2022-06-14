// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./AvengersNFT.sol";

contract NFTMarket {

    uint256 public mintingFee = 1 * (10 ** 18);
    //token id => on sale cost 
    mapping(uint256 => uint256) tokenOnSaleCost;
    //token id (on sale) => owner address
    mapping(uint256 => address) onSaleTokenOwners;
    IERC20 public payToken;
    // AvengersNFT public NFT;
    IERC721 public NFT;
    address owner;

    constructor(address _payToken, address _NFT){
        require(Address.isContract(_payToken), "TOKEN IS NOT A CONTRACT");
        require(Address.isContract(_NFT), "NFT IS NOT A CONTRACT");
        payToken = IERC20(_payToken);
        // NFT = AvengersNFT(_NFT);
        NFT = IERC721(_NFT);
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "ONLY OWNER");
        _;
    }

    //thinking on different implementation for mint function
    
    // function mintNFT(address _to, uint256 _fee) public {
    //     address nftCollectionOwner = NFT.owner();
    //     if(msg.sender != nftCollectionOwner){
    //         require(_fee >= mintingFee, "INSUFFICIENT FEE");
    //         payToken.transferFrom(msg.sender, nftCollectionOwner, mintingFee);
    //     }
    //     NFT.mint(_to);
    // }

    function createNFTSale(uint256 _tokenId, uint256 _newPrice) public {
        //NFT.ownerOf(_tokenId) checks _exists(_tokenId)
        require(msg.sender == NFT.ownerOf(_tokenId), "NOT NFT OWNER");
        require(_newPrice > 0, "NFT VALUE CANNOT BE ZERO");
        
        tokenOnSaleCost[_tokenId] = _newPrice;
        onSaleTokenOwners[_tokenId] = msg.sender;
        
        //msg.sender needs to approve contract before NFT transfer
        NFT.transferFrom(msg.sender, address(this), _tokenId);
    }

    function removeNFTSale(uint256 _tokenId) public {
        require(tokenOnSaleCost[_tokenId] > 0 && address(this) == NFT.ownerOf(_tokenId), "NFT NOT ON SALE");
        require(msg.sender == onSaleTokenOwners[_tokenId], "NOT NFT OWNER");
        
        tokenOnSaleCost[_tokenId] = 0;
        onSaleTokenOwners[_tokenId] = address(0);
        
        NFT.transferFrom(address(this), msg.sender, _tokenId);
    }

    function buyNFT(uint256 _tokenId, uint256 _price) public {
        uint256 price = tokenOnSaleCost[_tokenId];
        require(price > 0 && address(this) == NFT.ownerOf(_tokenId), "NFT NOT ON SALE");

        address tokenOwner = onSaleTokenOwners[_tokenId];
        require(msg.sender != tokenOwner, "NFT OWNER");
        require(_price >= price, "INSUFFICIENT PRICE");

        //msg.sender needs to approve this contract before transfer of Pay Tokens
        payToken.transferFrom(msg.sender, tokenOwner, price);

        tokenOnSaleCost[_tokenId] = 0;
        onSaleTokenOwners[_tokenId] = address(0);

        NFT.transferFrom(address(this), msg.sender, _tokenId);
    }

    function setMintingFee(uint256 _newFee) public onlyOwner {
        mintingFee = _newFee;
    }
}