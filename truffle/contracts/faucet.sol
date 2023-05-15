// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Faucet {
    uint constant WAIT_TIME = 30 minutes;
    uint constant MAX_BALANCE = 10 ether;
    
    mapping(address => uint) lastAccessTime;
    

    constructor() payable {
        
    }
    
    function requestTokens(address payable user) external {
        require(user.balance <= MAX_BALANCE, "Faucet balance is too high.");
        require(lastAccessTime[user] + WAIT_TIME <= block.timestamp, "Please wait before requesting tokens again.");
        
        lastAccessTime[user] = block.timestamp;

        payable(user).transfer(MAX_BALANCE);
    }
    
    receive() external payable {
        // this contract only allows receiving funds from external accounts
    }
}
