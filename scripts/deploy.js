// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config({path: ".env"});

const QUICKNODE_HTTP_URL = process.env.RPC_URL;

async function sleep(ms) {

  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const whitelistContract = await hre.ethers.deployContract("WhiteList", [10]);
  // 10 is the Maximum number of whitelisted addresses allowed

  // wait for the contract to deploy
  await whitelistContract.waitForDeployment();

  console.log("whitelist address " + whitelistContract.target);

  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds


  await hre.run(
    "verify:verify",
    {
      address: whitelistContract.target,
      constructorArguments: [10],
    }
  );
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.parseEther("0.001");

//   const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );

  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
