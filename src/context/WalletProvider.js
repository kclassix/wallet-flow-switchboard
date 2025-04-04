
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '../utils/walletConfig';

const WalletContext = createContext(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, connector: activeConnector } = useAccount();
  
  // Track all connected wallets
  const [connectedWallets, setConnectedWallets] = useState([]);
  const [activeWalletIndex, setActiveWalletIndex] = useState(0);
  
  // Effect to update connectedWallets when a new connection happens
  useEffect(() => {
    if (isConnected && address && activeConnector) {
      const walletExists = connectedWallets.some(wallet => wallet.address === address);
      
      if (!walletExists) {
        const newWallet = {
          address,
          connector: activeConnector,
          name: activeConnector.name,
        };
        
        setConnectedWallets(prev => [...prev, newWallet]);
        setActiveWalletIndex(connectedWallets.length);
      }
    }
  }, [isConnected, address, activeConnector]);

  // Connect wallet
  const connectWallet = async (connector) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Switch active wallet without disconnecting
  const switchWallet = (index) => {
    if (index >= 0 && index < connectedWallets.length) {
      setActiveWalletIndex(index);
    }
  };

  // Disconnect specific wallet
  const disconnectWallet = (index) => {
    const walletToDisconnect = connectedWallets[index];
    
    if (walletToDisconnect) {
      // If the active wallet is being disconnected, set a new active index
      if (index === activeWalletIndex) {
        const newActiveIndex = connectedWallets.length > 1 ? (index === 0 ? 1 : 0) : 0;
        setActiveWalletIndex(newActiveIndex);
      } else if (index < activeWalletIndex) {
        // Adjust active index if we're removing a wallet with a lower index
        setActiveWalletIndex(activeWalletIndex - 1);
      }
      
      // Remove the wallet from our state
      setConnectedWallets(prev => prev.filter((_, i) => i !== index));
      
      // If we're disconnecting the last wallet, call the actual disconnect
      if (connectedWallets.length === 1) {
        disconnect();
      }
    }
  };

  // Get active wallet
  const activeWallet = connectedWallets[activeWalletIndex] || null;
  
  const value = {
    connectors,
    connectedWallets,
    activeWallet,
    activeWalletIndex,
    connectWallet,
    switchWallet,
    disconnectWallet,
    isConnected: connectedWallets.length > 0,
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <WalletContext.Provider value={value}>
        {children}
      </WalletContext.Provider>
    </WagmiConfig>
  );
};
