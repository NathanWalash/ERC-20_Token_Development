async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);
  
    const DAO = await ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(deployer.address);
    await dao.waitForDeployment();
  
    console.log("DAOGBP deployed to:", dao.target);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
  