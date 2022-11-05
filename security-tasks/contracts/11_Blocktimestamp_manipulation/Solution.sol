// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
contract Roulette is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

     constructor() payable public // VRF Coordinator // LINK Token
        VRFConsumerBase(0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D,0x326C977E6efc84E512bB9C30f76E30c160eD06FB )
    {
        keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;
        fee = 0.25 * 10**18; // 0.25 LINK (Varies by network)
    }

    // Request randomness
    function getRandomNumber() public returns (bytes32 requestId) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        return requestRandomness(keyHash, fee);
    }

    // Callback function used by VRF Coordinator
    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        randomResult = randomness;
    }

    function spin() external payable {
        require(msg.value == 10 ether); // must send 10 ether to play
        uint answer = uint(getRandomNumber()) % 15;

        if (answer == 0) {
            (bool sent, ) = msg.sender.call{value: address(this).balance}("");
            require(sent, "Failed to send Ether");
        }
    }
}
