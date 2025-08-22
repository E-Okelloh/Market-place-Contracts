import { getFullnodeUrl } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
    },
  });

// Network configuration constants - THIS WAS MISSING!
export const NETWORK_CONFIG = {
  // TODO: Replace with your deployed package ID
  PACKAGE_ID: "0xbe234339d1aecad3e720ffb0c97eb1dc6a487b650e81556dc257b715e000ffac", // Placeholder - replace with your actual package ID
  
  // Explorer URLs for different networks
  EXPLORER_URLS: {
    devnet: "https://suiscan.xyz/devnet",
    testnet: "https://suiscan.xyz/testnet", 
    mainnet: "https://suiscan.xyz/mainnet"
  }
};

export { useNetworkVariable, useNetworkVariables, networkConfig };
