"use client";

import { useState, useEffect } from 'react';
import * as fcl from '@onflow/fcl';

fcl.config({
  "app.detail.title": "Flow Bounty System",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn"
});

export default function Home() {
  const [user, setUser] = useState({ loggedIn: false });
  const [bountyAmount, setBountyAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [bountiesLeft, setBountiesLeft] = useState('');

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  const createBounty = async () => {
    try {
      const transactionId = await fcl.mutate({
        cadence: `
          import BountyContract from 0x9d2ade18cb6bea1a

          transaction(amount: UFix64, deadline: UFix64, bountiesLeft: Int) {
            prepare(signer: AuthAccount) {
              BountyContract.createBounty(
                amount: amount,
                isPublic: true,
                deadline: deadline,
                bountiesLeft: bountiesLeft
              )
            }
          }
        `,
        args: (arg, t) => [
          arg(bountyAmount, t.UFix64),
          arg(deadline, t.UFix64),
          arg(bountiesLeft, t.Int)
        ],
        payer: fcl.authz,
        proposer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 999
      });
      console.log('Transaction ID:', transactionId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Flow Bounty System</h1>
      
      {user.loggedIn ? (
        <div className="space-y-4">
          <button
            onClick={() => fcl.unauthenticate()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
          
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Bounty Amount (FLOW)"
              value={bountyAmount}
              onChange={(e) => setBountyAmount(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Deadline (Unix Timestamp)"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Bounties Left"
              value={bountiesLeft}
              onChange={(e) => setBountiesLeft(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={createBounty}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Bounty
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fcl.authenticate()}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}