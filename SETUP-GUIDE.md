# Quick Setup Guide - AgriChain

## Prerequisites
- Node.js v18+ installed
- MetaMask browser extension

## Step-by-Step Setup

### 1️⃣ Install Dependencies
\`\`\`bash
npm install
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
\`\`\`

### 2️⃣ Compile Smart Contract
\`\`\`bash
npx hardhat compile
\`\`\`

### 3️⃣ Start Local Blockchain (Terminal 1)
\`\`\`bash
npx hardhat node
\`\`\`
**Keep this running!** Copy one of the private keys shown.

### 4️⃣ Deploy Contract (Terminal 2)
\`\`\`bash
npx hardhat run scripts/deploy.js --network localhost
\`\`\`
Note the deployed contract address.

### 5️⃣ Configure MetaMask
1. Open MetaMask
2. Add Network:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 1337
   - **Currency**: ETH
3. Import Account using private key from step 3

### 6️⃣ Start Frontend (Terminal 3)
\`\`\`bash
npm run dev
\`\`\`

### 7️⃣ Use the App
1. Open http://localhost:5173
2. Click "Connect Wallet"
3. Approve MetaMask connection
4. Start creating products!

## Testing the Flow

### Create Product (Farmer)
1. Go to "Farmer" tab
2. Fill in:
   - Crop: Basmati Paddy
   - Harvest Date: 2025-11-20
   - Location: Dinajpur, Bangladesh
   - Quality: Moisture 12%
3. Click "Create Product"
4. Approve transaction in MetaMask
5. Note the Product ID from alert

### Process Product (Supplier)
1. Go to "Supplier" tab
2. Enter Product ID from previous step
3. Fill in:
   - Processing Date: 2025-12-05
   - Mill Name: Dinajpur Rice Mills Ltd.
   - Batch Number: RICE-2025-1001
   - Weight: 25 kg bags
4. Click "Process Product"
5. Approve transaction

### Package Product (Packager)
1. Go to "Packager" tab
2. Enter same Product ID
3. Fill in:
   - Packaging Date: 2025-12-10
   - Brand: Golden Harvest Rice
   - Shelf Life: 12 months
4. Click "Package Product"
5. Approve transaction

### Track Product
1. Go to "Track" tab
2. Enter Product ID
3. Click "Search"
4. View complete supply chain history!

## Troubleshooting

**MetaMask not connecting?**
- Make sure Hardhat node is running
- Check network settings in MetaMask
- Try refreshing the page

**Transaction failing?**
- Ensure you have ETH in your account
- Check if product is at correct stage
- Verify Product ID exists

**Contract not found?**
- Redeploy contract: `npx hardhat run scripts/deploy.js --network localhost`
- Update contract address in `src/contracts/contract-address.json`

## Production Deployment

For testnet/mainnet:
1. Update `hardhat.config.js` with network details
2. Deploy to desired network
3. Update contract address in code
4. Configure MetaMask for that network

Enjoy tracking your supply chain on the blockchain! 🚀
