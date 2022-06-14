// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AvengersNFT is ERC721 , Ownable{

    using Counters for Counters.Counter;
    Counters.Counter tokenId;

    constructor() ERC721("Avengers NFT Collection", "AVG") {}

    function mint(address _to) public onlyOwner returns (uint256) {
        tokenId.increment();
        uint256 newTokenId = tokenId.current();
        _safeMint(_to, newTokenId);
        return newTokenId;
    }
}

// contract AvengersNFT is ERC721 , Ownable{

//     using Counters for Counters.Counter;
//     Counters.Counter tokenId;
//     address nftMarket;

//     constructor() ERC721("Avengers NFT Collection", "AVG") {}

//     modifier onlyNftMarket() {
//         require(msg.sender == nftMarket, "NOT NFT MARKET");
//         _;
//     }

//     function mint(address _to) public onlyNftMarket returns (uint256) {
//         tokenId.increment();
//         uint256 newTokenId = tokenId.current();
//         _safeMint(_to, newTokenId);
//         return newTokenId;
//     }

//     function setNftMarket(address _nftMarket) public onlyOwner {
//         nftMarket = _nftMarket;
//     }

// }