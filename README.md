# DAO GBP Stablecoin Development Project

A development and testing environment for a DAO GBP stablecoin (DAOGBP) with controlled minting and burning capabilities. This project serves as the foundation for a larger DAO treasury management system that will integrate traditional fiat payments with blockchain operations.

## Overview

This project implements a basic ERC-20 stablecoin (DAOGBP) designed to be pegged to British Pounds (1 DAOGBP = 1 GBP). The current implementation focuses on core token functionality with controlled minting and burning operations, providing the foundation for future integration with fiat payment systems and DAO governance.

## Architecture

The system consists of three core components:

1. **DAOGBP Stablecoin** - An ERC-20 token pegged to British Pounds (1 DAOGBP = 1 GBP)
2. **Bridge Backend Service** - RESTful API for testing mint/burn operations
3. **Smart Contracts** - On-chain logic for token management with owner-controlled operations

## Key Features

### Token Management
- **Controlled Minting**: Only the contract owner can mint new DAOGBP tokens
- **Secure Burning**: Only the contract owner can burn tokens from any address
- **Transparent Ledger**: All operations recorded on blockchain for auditability
- **British Pound Peg**: Designed to maintain 1:1 ratio with GBP

### Development Environment
- **Hardhat Framework**: Complete development, testing, and deployment setup
- **OpenZeppelin Contracts**: Industry-standard ERC-20 implementation
- **Testing Infrastructure**: Ready for comprehensive token testing

## Critical Operations: Mint and Burn

### `/mint` Endpoint

**Purpose**: Creates new DAOGBP tokens and assigns them to a specified address

**Process**:
1. Backend validates minting request
2. Backend calls `/mint` with recipient address and amount
3. Smart contract mints equivalent DAOGBP tokens to recipient's wallet
4. Transaction hash returned for confirmation

**Security**: Only the authorized backend wallet (contract owner) can mint tokens

### `/burn` Endpoint

**Purpose**: Destroys DAOGBP tokens from a specified address

**Process**:
1. Backend validates burning request
2. Backend calls `/burn` with address and amount to burn
3. Smart contract burns tokens from specified address
4. Transaction hash returned for confirmation

**Security**: Only the authorized backend wallet (contract owner) can burn tokens

## Technical Implementation

### Smart Contract (DAO.sol)
```solidity
contract DAO is ERC20, Ownable {
    constructor(address initialOwner) ERC20("DAO Pound Token", "DAOGBP") Ownable(initialOwner) {}
    
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
```

### Bridge Backend API
- **Framework**: Node.js with Express
- **Blockchain Integration**: Ethers.js for Ethereum interaction
- **Security**: Environment-based private key management
- **CORS**: Enabled for frontend integration

## Environment Configuration

Create a `.env` file in the bridge-backend directory:

```env
RPC_URL=your_ethereum_rpc_url
PRIVATE_KEY=your_backend_wallet_private_key
TOKEN_ADDRESS=deployed_daogbp_token_address
PORT=3000
```

## API Endpoints

### POST /mint
Creates new DAOGBP tokens

**Request Body**:
```json
{
  "to": "0xUserWalletAddress",
  "amount": "100"
}
```

**Response**:
```json
{
  "status": "success",
  "txHash": "0x..."
}
```

### POST /burn
Destroys DAOGBP tokens

**Request Body**:
```json
{
  "from": "0xUserWalletAddress", 
  "amount": "50"
}
```

**Response**:
```json
{
  "status": "success",
  "txHash": "0x..."
}
```

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Hardhat development environment

### Installation
```bash
# Install dependencies
npm install

# Install bridge backend dependencies
cd bridge-backend
npm install
```

### Smart Contract Deployment
```bash
# Compile contracts
npx hardhat compile

# Deploy to local network
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

# Deploy to testnet
npx hardhat run scripts/deploy.js --network <testnet>
```

### Bridge Backend
```bash
cd bridge-backend
npm start
```

## Testing

### Contract Testing
```bash
npx hardhat test
```

### API Testing
Use tools like Postman or curl to test the mint/burn endpoints:

```bash
# Test minting
curl -X POST http://localhost:3000/mint \
  -H "Content-Type: application/json" \
  -d '{"to": "0x...", "amount": "100"}'

# Test burning
curl -X POST http://localhost:3000/burn \
  -H "Content-Type: application/json" \
  -d '{"from": "0x...", "amount": "50"}'
```

## Security Considerations

### Access Control
- Mint/burn operations restricted to contract owner
- Private keys stored securely in environment variables
- CORS configured for development/testing

### Transaction Safety
- All operations require blockchain confirmation
- Transaction hashes returned for audit trail
- Error handling for failed transactions

## Future Development

This project serves as the foundation for a larger DAO treasury management system. Planned integrations include:

- **Fiat Payment Integration**: Connection to traditional banking systems
- **DAO Governance**: Voting and proposal mechanisms
- **Treasury Management**: Automated contribution and claim processing
- **Regulatory Compliance**: KYC/AML and financial regulation support
- **Multi-currency Support**: Expansion beyond GBP to other currencies

## Project Structure

```
├── contracts/
│   └── DAO.sol              # Main DAOGBP token contract
├── bridge-backend/
│   ├── index.js             # API server for mint/burn operations
│   ├── DAO_abi.json         # Contract ABI
│   └── package.json         # Backend dependencies
├── scripts/
│   └── deploy.js            # Contract deployment script
├── test/
│   └── Lock.js              # Test files
└── hardhat.config.js        # Hardhat configuration
```

## Benefits

- **Development Foundation**: Solid base for building complex DAO systems
- **British Focus**: Designed specifically for GBP integration
- **Security**: Controlled token operations with owner-only access
- **Transparency**: All operations recorded on blockchain
- **Scalability**: Ready for integration with larger systems
