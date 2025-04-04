
import React from 'react';
import { useWallet } from '../context/WalletProvider';
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Wallet, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const WalletSwitcher = () => {
  const { 
    connectedWallets, 
    activeWallet, 
    switchWallet, 
    disconnectWallet, 
    activeWalletIndex 
  } = useWallet();
  
  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Handle opening web3modal for adding another wallet
  const openWeb3Modal = () => {
    web3modal.openModal();
  };
  
  if (connectedWallets.length === 0) {
    return null;
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet size={16} />
          {activeWallet ? (
            <span>{formatAddress(activeWallet.address)}</span>
          ) : (
            <span>Select Wallet</span>
          )}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          {connectedWallets.map((wallet, index) => (
            <DropdownMenuItem
              key={wallet.address}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => switchWallet(index)}
            >
              <div className="flex items-center gap-2">
                <Wallet size={16} />
                <span>{wallet.name} - {formatAddress(wallet.address)}</span>
              </div>
              <div className="flex items-center gap-2">
                {index === activeWalletIndex && <Check size={16} className="text-primary" />}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    disconnectWallet(index);
                  }}
                >
                  <X size={14} />
                </Button>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={openWeb3Modal}>
          <div className="flex items-center gap-2">
            <span>+ Add Another Wallet</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletSwitcher;
