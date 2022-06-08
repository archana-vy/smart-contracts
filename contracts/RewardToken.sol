// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20{

    constructor() ERC20("Vault Reward Token","VRT"){
    }

    function mint(address to, uint amount) public {
        _mint(to, amount);
    }

    function burn(address owner, uint amount) public {
        _burn(owner, amount);
    }

}