const hre = require("hardhat");

const contactAddress = "0xab0b910f3f58ddE2A0231887a18bDD7f54cCA49B"; 

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function main() {
    const nftContract = await hre.ethers.deployContract("CryptoDove", [contactAddress]);

    await nftContract.waitForDeployment();

    console.log("deploying to ether" + nftContract.target);
    

    await sleep(30 * 1000);
    
    await hre.run(
        "verify:verify",
        {
            address: nftContract.target,
            constructorArguments: [contactAddress],
        }
    );
  }

 
  



  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });