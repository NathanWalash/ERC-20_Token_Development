const fs = require('fs');
const path = require('path');

// Adjust the relative path if your bridge-backend folder is not a sibling to artifacts/
const artifactPath = path.resolve(__dirname, '../artifacts/contracts/DAO.sol/DAO.json');
const artifact     = require(artifactPath);

// Write just the ABI array into DAO_abi.json
const abiOutputPath = path.resolve(__dirname, 'DAO_abi.json');
fs.writeFileSync(abiOutputPath, JSON.stringify(artifact.abi, null, 2));

console.log('ABI exported to bridge-backend/DAO_abi.json');
