

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext();

// Provide Wallet Context to the whole application
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Connect Wallet function
  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem("walletAddress", accounts[0]); // Save the wallet address in localStorage
      }
    } catch (error) {
      if (error.code === 4001) {
        console.error("User rejected the request");
        alert("You rejected the connection request.");
      } else if (error.code === -32002) {
        console.error("A request is already pending");
        alert("A request is already pending, please try again.");
      } else {
        console.error("Error connecting to wallet", error);
        alert("There was an error connecting to your wallet.");
      }
    }
  };

  // Restore wallet connection on page load
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
      setIsConnected(true);
    }

    if (typeof window.ethereum !== "undefined") {
      // Listen for account change
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          localStorage.setItem("walletAddress", accounts[0]);
        } else {
          setWalletAddress(null);
          setIsConnected(false);
          localStorage.removeItem("walletAddress");
        }
      });

      // Listen for network change
      window.ethereum.on("chainChanged", () => {
        window.location.reload(); // Reload the page on network change
      });
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged");
        window.ethereum.removeListener("chainChanged");
      }
    };
  }, []);

  return (
    <WalletContext.Provider value={{ walletAddress, isConnected, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the wallet context
export const useWallet = () => {
  return useContext(WalletContext);
};
