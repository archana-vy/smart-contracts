// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./RewardToken.sol";

contract Vault{

    event WithdrawApproval(address sender, uint256 wdIndex, address to, uint256 amount);
    event Withdrwan(uint256 wdIndex, address to, uint256 amount);

    struct WithdrawTxn{
        address to;
        uint256 amount;
        bool isWithdrawn;
        uint256 numOfApprovals;
    }

    bool isLocked;
    RewardToken reward;
    IERC20 xen;
    uint256 public requiredApprovals;
    address[] public owners;
    mapping(address => bool) public isOwner;
    mapping(uint256 => mapping(address => bool)) approvals; //wdIndex => owners => true/false
    mapping(address =>  uint) depositerBalance;
    WithdrawTxn[] withdrawals;

    modifier onlyDepositer() {
        require(depositerBalance[msg.sender] > 0, "caller not a depositer");
        _;
    }

    modifier wdIndexExists(uint256 _wdIndex){
        require(_wdIndex <= withdrawals.length);
        _;
    }

    modifier onlyOwner() {
        require(isOwner[msg.sender], "caller is not owner");
        _;
    }

    modifier isApproved(uint256 _wdIndex) {
        require(!approvals[_wdIndex][msg.sender], "caller already approved withdrawal");
        _;
    }

    modifier lock() {
        require(isLocked == false, "LOCKED!");
        isLocked = true;
        _;
        isLocked = false;
    }
    
    constructor(address[] memory _owners, uint256 _requiredApprovals) {
        
        require(_owners.length > 0, "owners required");
        require(
            _requiredApprovals > 0 &&
                _requiredApprovals <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        requiredApprovals = _requiredApprovals;
    }

    function setRewardToken(address _reward) public {
        require(Address.isContract(_reward), "address not a contract");

        reward = RewardToken(_reward);
    }

    function setXenToken(address _xen) public {
        require(Address.isContract(_xen), "address not a contract");
        
        xen = IERC20(_xen);
    }

    function deposite(uint _amount) public lock {
        require(_amount > 0, "amount cannot be zero");
        depositerBalance[msg.sender] += _amount;
        xen.transferFrom(msg.sender, address(this), _amount);
        reward.mint(msg.sender, _amount);
    }

    function withdraw(uint256 _wdIndex) public wdIndexExists(_wdIndex) onlyDepositer lock {
        require(!withdrawals[_wdIndex].isWithdrawn, "already withdrawn");
        require(withdrawals[_wdIndex].numOfApprovals >= requiredApprovals, "required number of approvals not reached");
        uint256 amount = withdrawals[_wdIndex].amount;
        address to = withdrawals[_wdIndex].to;
        depositerBalance[msg.sender] -= amount;
        withdrawals[_wdIndex].isWithdrawn = true;
        xen.transfer(to, amount);
        reward.burn(msg.sender, amount);
        emit Withdrwan(_wdIndex, to, amount);
    }

    function submitWithdrawal(address _to, uint256 _amount) public onlyDepositer() {
        require(_to != address(0), "recepient address cannot be zero");
        require(_amount > 0, "amount cannot be zero");
        require(depositerBalance[msg.sender] >= _amount, "withdraw amount cannot exceed balance");
        uint256 wdIndex = withdrawals.length;
        withdrawals.push(WithdrawTxn({
            to: _to,
            amount: _amount,
            isWithdrawn: false,
            numOfApprovals: 0
        }));
        emit WithdrawApproval(msg.sender, wdIndex, _to, _amount);
    }

    function approve(uint256 _wdIndex) public wdIndexExists(_wdIndex) onlyOwner isApproved(_wdIndex) {
        WithdrawTxn memory wdTxn = withdrawals[_wdIndex];
        wdTxn.numOfApprovals += 1;
        approvals[_wdIndex][msg.sender] = true;
    }

    function getDepositerBalance(address _depositer) external view returns(uint256) {
        return depositerBalance[_depositer];
    }

    function getContractBalance() external view returns (uint256){
        return xen.balanceOf(address(this));
    }
}