const hre = require("hardhat");
const USElection = require("../artifacts/contracts/USElection.sol/USElection.json");
const run = async function () {
  console.log("Hello world");
  console.log(hre.ethers.version);
  const provider = new hre.ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const latestBlock = await provider.getBlock("latest");
  console.log(latestBlock.hash);
  const wallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );
  const balance = await wallet.getBalance();
  console.log(balance.toString());
  console.log(hre.ethers.utils.formatEther(balance, 18));
  const contractAddress = "0x0BACA630e7066A70c367E1b69B1B25A8695b975f";
  const electionContractOne = new hre.ethers.Contract(
    contractAddress,
    USElection.abi,
    wallet
  );
  //   console.log(electionContractOne);

  // Another way to create a contract
  const USElectionFactory = await hre.ethers.getContractFactory("USElection");
  const electionContract = await USElectionFactory.attach(
    "0x0BACA630e7066A70c367E1b69B1B25A8695b975f"
  );
  //   console.log(electionContract2);
  const hasEnded = await electionContract.electionEnded();
  console.log("The election has ended:", hasEnded);

  const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio");
  console.log("Have results for Ohio:", haveResultsForOhio);
  const transactionOhio = await electionContract.submitStateResult([
    "Ohio",
    250,
    150,
    24,
  ]);
  const transactionReceipt = await transactionOhio.wait();
  if (transactionReceipt.status != 1) {
    // 1 means success
    console.log("Transaction was not successful");
    return;
  }

  const resultsSubmittedOhioNew = await electionContract.resultsSubmitted(
    "Ohio"
  );
  console.log("Results submitted for Ohio", resultsSubmittedOhioNew);

  const currentLeader = await electionContract.currentLeader();
  console.log("Current leader", currentLeader);
};

run();
