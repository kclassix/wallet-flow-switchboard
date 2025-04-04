
import React from 'react';
import { useWallet } from '../context/WalletProvider';
import WalletSwitcher from './WalletSwitcher';
import { web3modal } from '../utils/walletConfig';
import { Button } from "@/components/ui/button";
import { Wallet } from 'lucide-react';

const Header = () => {
  const { isConnected } = useWallet();
  
  const openWeb3Modal = () => {
    web3modal.openModal();
  };
  
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-lg font-bold">Multi-Wallet DApp</div>
        
        <div className="flex items-center gap-4">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <WalletSwitcher />
              <Button variant="ghost" size="icon" onClick={openWeb3Modal}>
                <Wallet size={20} />
              </Button>
            </div>
          ) : (
            <Button onClick={openWeb3Modal} className="flex items-center gap-2">
              <Wallet size={18} />
              <span>Connect Wallet</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
