require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
app.use(cors());
app.use(express.json());

// Load ABI and set up ethers
const abi = require('./DAO_abi.json');
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet   = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const token    = new ethers.Contract(process.env.TOKEN_ADDRESS, abi, wallet);

// POST /mint
// { to: "0xUserAddr", amount: "50" }
app.post('/mint', async (req, res) => {
  try {
    const { to, amount } = req.body;
    const wei = ethers.parseUnits(amount.toString(), 18);
    const tx  = await token.mint(to, wei);
    await tx.wait();
    res.json({ status: 'success', txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /burn
// { from: "0xUserAddr", amount: "30" }
app.post('/burn', async (req, res) => {
  try {
    const { from, amount } = req.body;
    const wei = ethers.parseUnits(amount.toString(), 18);
    const tx  = await token.burn(from, wei);
    await tx.wait();
    res.json({ status: 'success', txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Bridge service listening on port ${process.env.PORT}`);
});
