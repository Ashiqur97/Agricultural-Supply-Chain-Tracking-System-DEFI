import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { connectWallet } from '../utils/ethereum';
import { Wallet } from 'lucide-react';

export default function ConnectWallet() {
  const [account, setAccount] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const address = await connectWallet();
      setAccount(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please install MetaMask.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      {account ? (
        <Button variant="outline" className="gap-2">
          <Wallet className="w-4 h-4" />
          {account.slice(0, 6)}...{account.slice(-4)}
        </Button>
      ) : (
        <Button onClick={handleConnect} disabled={isConnecting} className="gap-2">
          <Wallet className="w-4 h-4" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
    </div>
  );
}
