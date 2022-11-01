require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-etherscan")
require("solidity-coverage");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: [process.env.PRIVATE_KEY]
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/p4DXFRf_9xJv9flg-FhVxxit8yPj9Ev5",
      accounts: [process.env.PRIVATE_KEY],
  },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "VEN5WDCEUEF2PIY3JIEK7VIDAESVN767YK"
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
    compilers: [
      {
        version: "0.7.4",
      },
      {
        version: "0.8.4",
      },
    ],
  },
};
task("deploy-testnets", "Deploys contract on a provided network")
  .setAction(async () => {
    const deployElectionContract = require("./scripts/deploy");
    await deployElectionContract();
    await hre.run('print', { message: "Done!" })
  });
subtask("print", "Prints a message")
  .addParam("message", "The message to print")
  .setAction(async (taskArgs) => {
    console.log(taskArgs.message);
  });
task("deploy-mainnet", "Deploys contract on a provided network")
  .addParam("privateKey", "Please provide the private key")
  .setAction(async ({ privateKey }) => {
    const deployElectionContract = require("./scripts/deploy-with-params");
    await deployElectionContract(privateKey);
  });