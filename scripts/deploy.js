async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);
  
    const DAO = await ethers.getContractFactory("DAO");
    const dao = await DAO.deploy();
    await dao.deployed();
  
    console.log("DAOGBP deployed to:", dao.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
  