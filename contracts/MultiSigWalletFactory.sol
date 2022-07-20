// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./MultiSigWallet.sol";

contract MultiSigWalletFactory{

    event WalletInstantiation(address sender, address instantiation);

    mapping(address => bool) isInstantiation;
    mapping (address => address[]) instantiations;

    function createWallet(
        address[] memory _owners, 
        uint256 _required
    ) public returns (address wallet) 
    {
        wallet = address(new MultiSigWallet(_owners, _required));
        register(wallet);
    }

    function register(address _instantiation) internal {
        isInstantiation[_instantiation] = true;
        instantiations[msg.sender].push(_instantiation);

        emit WalletInstantiation(msg.sender, _instantiation);
    }
}