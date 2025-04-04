
import React from 'react';
import { WalletProvider } from '../context/WalletProvider';
import { web3modal } from '../utils/walletConfig';
import Header from '../components/Header';
import WalletConnect from '../components/WalletConnect';
import WalletInfo from '../components/WalletInfo';
import Transaction from '../components/Transaction';
import { useWallet } from '../context/WalletProvider';

// Internal component to use the wallet context
const DappContent = () => {
  const { isConnected } = useWallet();
  
  return (
    <div className="container mx-auto px-4 py-8">
      {!isConnected ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20">
          <h1 className="text-3xl font-bold text-center">Multi-Wallet DApp</h1>
          <p className="text-center text-muted-foreground max-w-md">
            Connect multiple wallets and switch between them without disconnecting.
          </p>
          <WalletConnect />
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <WalletInfo />
          <Transaction />
        </div>
      )}
    </div>
  );
};

// Main Index component that provides the wallet context
const Index = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <DappContent />
        </main>
        <footer className="border-t py-4">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            Multi-Wallet DApp &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </WalletProvider>
  );
};

export default Index;
