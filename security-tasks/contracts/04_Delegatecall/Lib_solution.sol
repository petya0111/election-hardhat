// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
/** using statless library */
library Lib {
    address public owner;

    function pwn() public {
        owner = msg.sender;
    }
}