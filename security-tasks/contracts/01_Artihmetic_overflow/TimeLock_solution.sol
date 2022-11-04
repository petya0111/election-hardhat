// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/** using safeMath library for contracts version Solidity < 0.8 */

contract TimeLock {
    using SafeMath for uint256;
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] = SafeMath.add(balances[msg.sender], msg.value);
        lockTime[msg.sender] = SafeMath.add(block.timestamp, 1 weeks);
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] = SafeMath.add(lockTime[msg.sender], _secondsToIncrease);
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}
