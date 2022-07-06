import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import { Web3Context } from "./context/StateProvider";
import Collections from "./components/Collections";
import toast, { Toaster } from "react-hot-toast";
import CreateCollection from "./components/CreateCollections";
import NFTDetail from "./components/NFTDetails";
import Account from "./components/Account";

function App() {
  const { account, setAccount, setChain } = useContext(Web3Context);
  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => setAccount(accounts[0]));
      setChain(window.ethereum.networkVersion);
      console.log(account);
    } else {
      console.log("Please connect metamask");
    }
  };
  useEffect(() => {
    connectWallet();
  }, []);
  // window.ethereum.on("accountsChanged", window.location.reload());
  // window.ethereum.on("chainChanged", window.location.reload());
  return (
    <Router>
      <div>
        {!account ? (
          <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42]">
            <button
              className="border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={[<Header key={1} />, <Hero key={2} />]} />
            <Route
              path="/nft/:id"
              element={[<Header key={1} />, <NFTDetail key={2} />]}
            />
            <Route
              path="/profile"
              element={[<Header key={1} />, <Account key={2} />]}
            />
            <Route
              path="/collections"
              element={[<Header key={1} />, <Collections key={2} />]}
            />
            <Route
              path="/create"
              element={[<Header key={1} />, <CreateCollection key={2} />]}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
