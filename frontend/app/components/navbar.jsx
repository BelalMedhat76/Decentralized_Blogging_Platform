"use client";

import { useState } from "react";
import { useWallet } from "../context/WalletContext";

export default function Navbar() {
  const { walletAddress, isConnected, connectWallet } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-primary text-white fixed top-0 w-full z-10 shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <p className="text-sm md:text-xl lg:text-2xl font-bold">
          Blogging Platform
        </p>

        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>

        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-primary md:bg-transparent md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4 p-6 md:p-0 transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <a
            href="/"
            className="block md:inline-block text-lg font-bold hover:text-secondary transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/create"
            className="block md:inline-block text-lg font-bold hover:text-secondary transition-colors duration-200"
          >
            Create Blog
          </a>
          {isConnected ? (
            <span className="block md:inline-block bg-gray-900 text-white px-4 py-2 rounded-md text-center">
              Connected
            </span>
          ) : (
            <button
              onClick={connectWallet}
              className="block md:inline-block bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-accent transition-colors duration-200"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
