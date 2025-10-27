import { ethers } from 'ethers';
import contractAddress from '../contracts/contract-address.json';

const SupplyChainABI = [
  "function createProduct(string _crop, string _harvestDate, string _location, string _quality) public returns (uint256)",
  "function processProduct(uint256 _id, string _processingDate, string _millName, string _batchNumber, string _weight) public",
  "function packageProduct(uint256 _id, string _packagingDate, string _brand, string _shelfLife) public",
  "function getProduct(uint256 _id) public view returns (tuple(uint256 id, string crop, string harvestDate, string location, string quality, string processingDate, string millName, string batchNumber, string weight, string packagingDate, string brand, string shelfLife, uint8 currentStage, address farmer, address supplier, address packager, bool exists))",
  "function productCount() public view returns (uint256)",
  "event ProductCreated(uint256 indexed id, address indexed farmer)",
  "event ProductProcessed(uint256 indexed id, address indexed supplier)",
  "event ProductPackaged(uint256 indexed id, address indexed packager)"
];


export const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const getContract = async () => {
  const provider = getProvider();
  if (!provider) return null;
  
  const signer = await provider.getSigner();
  return new ethers.Contract(
    contractAddress.SupplyChain,
    SupplyChainABI,
    signer
  );
};

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  
  const accounts = await window.ethereum.request({ 
    method: 'eth_requestAccounts' 
  });
  return accounts[0];
};

export { SupplyChainABI, contractAddress };
