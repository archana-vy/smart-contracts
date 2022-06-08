// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RewardToken.sol";

contract Vault{

    bool isLocked;
    
    RewardToken reward;
    IERC20 xen;

    mapping(address =>  uint) depositerBalance;
    
    constructor(address _reward, address _xen) {
        reward = RewardToken(_reward);
        xen = IERC20(_xen);
    }

    modifier lock() {
        require(isLocked == false, "LOCKED!");
        isLocked = true;
        _;
        isLocked = false;
    }

    function deposite(uint amount) public lock {
        require(amount > 0, "INSUFFICIENT AMOUNT");
        depositerBalance[msg.sender] += amount;
        xen.transferFrom(msg.sender, address(this), amount);
        reward.mint(msg.sender, amount);
    }

    function withdraw(uint amount) public lock {
        require(amount > 0, "INSUFFICIENT AMOUNT");
        require(depositerBalance[msg.sender] >= amount, "INSUFFICIENT TOKEN BALANCE");
        depositerBalance[msg.sender] -= amount;
        xen.transfer(msg.sender, amount);
        reward.burn(msg.sender, amount);
    }

    function getBalance() external view returns (uint256){
        return xen.balanceOf(address(this));
    }
}