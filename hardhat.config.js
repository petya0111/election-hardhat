require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-etherscan")
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/40c2813049e44ec79cb4d7e0d18de173",
      accounts: ['0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0']
    }
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