const hre = require("hardhat");
require("@nomiclabs/hardhat-waffle");

async function main() {
    const MintContractFactory = await hre.ethers.getContractFactory("Mint");
    const mintContract = await MintContractFactory.deploy();
    await mintContract.deployed();
    console.log("Contract deployed to:", mintContract.address);

    // // call the function
    // let txn = await mintContract.mintYourNft();
    // await txn.wait();
    // console.log("Minted nft #1");

    // // Mint another nft
    // txn = await mintContract.mintYourNft();
    // await txn.wait();
    // console.log("Minted nft #2");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
