// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;

    /**
     * @notice Initializes the contract with a specified data feed address
     * @param _dataFeedAddress The address of the Chainlink data feed contract
     */
    constructor(address _dataFeedAddress) {
        require(_dataFeedAddress != address(0), "Invalid data feed address");
        dataFeed = AggregatorV3Interface(_dataFeedAddress);
    }

    /**
     * @notice Returns the latest price data from the Chainlink feed
     * @return The latest answer from the Chainlink data feed
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        (
            /* uint80 roundID */,
            int answer,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = dataFeed.latestRoundData();
        return answer;
    }
}

