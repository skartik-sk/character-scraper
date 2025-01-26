"use client";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CreatorCard from '../components/CreatorCard';
import ConnectWallet from '../components/ConnectWallet';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    // Fetch creators from the contract
    if (isConnected) {
      fetchCreators();
    }
  }, [isConnected]);

  const fetchCreators = async () => {
    // Implementation to fetch creators
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Social Tipping Platform</h1>
      {!isConnected ? (
        <ConnectWallet />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, index) => (
            <CreatorCard key={index} creator={creator} />
          ))}
        </div>
      )}
    </main>
  );