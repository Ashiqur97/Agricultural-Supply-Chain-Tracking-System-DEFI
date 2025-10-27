# AgriChain - Blockchain Supply Chain Tracker

A complete blockchain-based supply chain tracking system for agriculture, built with Solidity, Hardhat, Ethers.js, React, and Tailwind CSS.

## 🚀 Features

- **Farmer Registration**: Record crop details, harvest date, location, and quality checks
- **Supplier/Mill Processing**: Track processing dates, mill information, batch numbers, and weight
- **Packaging Stage**: Add brand information, packaging dates, and shelf life
- **Product Tracking**: Search and view complete supply chain history for any product
- **Blockchain Integration**: Immutable records on Ethereum blockchain
- **MetaMask Support**: Connect wallet and interact with smart contracts

## 🛠️ Technology Stack

- **Smart Contracts**: Solidity ^0.8.19
- **Blockchain Framework**: Hardhat
- **Web3 Library**: Ethers.js v6
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Network**: Ethereum (Local/Testnet/Mainnet)

## 📦 Installation

### 1. Install Frontend Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Install Blockchain Dependencies
\`\`\`bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install ethers@^6.9.0
\`\`\`

### 3. Compile Smart Contracts
\`\`\`bash
npx hardhat compile
\`\`\`

### 4. Start Local Blockchain
\`\`\`bash
npx hardhat node
\`\`\`

### 5. Deploy Smart Contract
In a new terminal:
\`\`\`bash
npx hardhat run scripts/deploy.js --network localhost
\`\`\`

### 6. Start Frontend
\`\`\`bash
npm run dev
\`\`\`

## 🔧 Configuration

### MetaMask Setup
1. Install MetaMask browser extension
2. Add local network:
   - Network Name: Hardhat Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 1337
   - Currency Symbol: ETH

3. Import test account from Hardhat node output

## 📝 Smart Contract Functions

### Farmer Functions
- `createProduct()` - Create new product with harvest details

### Supplier Functions
- `processProduct()` - Add processing information to existing product

### Packager Functions
- `packageProduct()` - Add packaging details to processed product

### Query Functions
- `getProduct()` - Retrieve complete product information
- `productCount()` - Get total number of products

## 🎯 Usage Flow

1. **Connect Wallet**: Click "Connect Wallet" button
2. **Farmer Stage**: Create product with crop details
3. **Supplier Stage**: Process product with mill information
4. **Packager Stage**: Package product with brand details
5. **Track Product**: Search by product ID to view complete history

## 🔐 Security Features

- Immutable blockchain records
- Stage validation (products must progress in order)
- Address tracking for each stage participant
- Event logging for all transactions

## 📄 Contract Address

After deployment, the contract address is saved to:
`src/contracts/contract-address.json`

## 🌐 Network Support

- Local Hardhat Network (Development)
- Ethereum Testnets (Sepolia, Goerli)
- Ethereum Mainnet (Production)

## 🤝 Contributing

This is a demonstration project showcasing blockchain integration with React.

## 📜 License

MIT License
