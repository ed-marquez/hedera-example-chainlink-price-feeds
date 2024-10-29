// Clear the console
console.clear();
// Chai and ethers
const { expect } = require("chai");
const { ethers } = require("hardhat");
// Utilities, and constants
const { OPERATOR_KEY_HEX } = require("../constants.js");
const { waitForInput } = require("../utils/prompt.js");
// ABIs
const AggregatorV3InterfaceABI_JSON = require("@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json");
const AggregatorV3InterfaceABI = new ethers.Interface(AggregatorV3InterfaceABI_JSON);

describe("🟠 Get Chainlink Price Feeds on Hedera 🟠", function () {
	// Set up the ethers signer
	const operatorSigner = new ethers.Wallet(OPERATOR_KEY_HEX, ethers.provider);
	// Gas limit
	const gasLimit = 1000000; // Set your desired gas limit
	// Price feeds
	let priceFeeds;

	before("Set up the price feeds", async function () {
		// From: https://documentation-nw12c67zj-chainlinklabs.vercel.app/data-feeds/price-feeds/addresses?network=hedera&page=1#hedera-testnet
		priceFeeds = {
			"BTC/USD": "0x058fE79CB5775d4b167920Ca6036B824805A9ABd",
			"DAI/USD": "0xdA2aBF7C90aDC73CDF5cA8d720B87bD5F5863389",
			"ETH/USD": "0xb9d461e0b962aF219866aDfA7DD19C52bB9871b9",
			"HBAR/USD": "0x59bC155EB6c6C415fE43255aF66EcF0523c92B4a",
			"LINK/USD": "0xF111b70231E89D69eBC9f6C9208e9890383Ef432",
			"USDC/USD": "0xb632a7e7e02d76c0Ce99d9C62c7a2d1B5F92B6B5",
			"USDT/USD": "0x06823de8E77d708C4cB72Cbf04495D67afF4Bd37",
		};
	});

	it("Should get the latest prices for all feeds", async function () {
		for (const [pair, address] of Object.entries(priceFeeds)) {
			console.log(`\n📊 Getting price for ${pair}:`);

			const priceFeed = await ethers.getContractAt(AggregatorV3InterfaceABI, address, operatorSigner);
			const latestRoundData = await priceFeed.latestRoundData();

			const [roundId, answer, startedAt, updatedAt, answeredInRound] = latestRoundData;
			expect(answer).to.be.gt(0, `${pair} price should be > 0`);

			console.log(`- Round ID: ${roundId}`);
			console.log(`- Price: ${answer}`);
			console.log(`- Started At: ${startedAt}`);
			console.log(`- Updated At: ${updatedAt}`);
			console.log(`- Answered In Round: ${answeredInRound}`);
			console.log("----------------------------------------");

			await waitForInput();
		}

		console.log(`\n- THE END ============================================================\n`);
		console.log(`👇 Go to:`);
		console.log(`🔗 www.hedera.com/discord\n`);
	});
});
