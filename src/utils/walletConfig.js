
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import { EthereumClient } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/wagmi';

// Configure chains & providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

// Set up connectors
const connectors = [
  new MetaMaskConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'Multi-Wallet DApp',
    },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: 'YOUR_PROJECT_ID', // To be replaced with actual project ID
    },
  }),
];

// Create wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// Create ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// Create web3modal
const web3modal = new Web3Modal(
  {
    projectId: 'YOUR_PROJECT_ID', // To be replaced with actual project ID
    themeMode: 'dark',
    themeVariables: {
      '--w3m-font-family': 'Roboto, sans-serif',
      '--w3m-accent-color': '#3b82f6',
    },
  },
  ethereumClient
);

export { wagmiConfig, ethereumClient, web3modal, chains };
