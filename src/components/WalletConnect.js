
import React from 'react';
import { useWallet } from '../context/WalletProvider';
import { web3modal } from '../utils/walletConfig';
import { Button } from "@/components/ui/button";
import { Wallet } from 'lucide-react';

const WalletConnect = () => {
  const { connectWallet, connectors, isConnected } = useWallet();
  
  // Open Web3Modal
  const openWeb3Modal = async () => {
    web3modal.openModal();
  };
  
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {!isConnected ? (
        <Button 
          onClick={openWeb3Modal}
          className="flex items-center gap-2"
        >
          <Wallet size={18} />
          <span>Connect Wallet</span>
        </Button>
      ) : (
        <div className="text-sm text-muted-foreground">
          Add another wallet by clicking on the wallet icon in the header
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
