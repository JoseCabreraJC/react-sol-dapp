pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';


contract DeBank {
    string public name = 'Decentralized Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }
    function depositToken(uint256 _amount){
        require(_amount >= 0, 'amount cannot be 0')

        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked) {
            stakers.push[msg.sender];
        }

        ifStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

}