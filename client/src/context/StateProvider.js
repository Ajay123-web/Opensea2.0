import React from "react";
import { useEffect, useState } from "react";
import NFTFactory from "../abis/NFTFactory.json";
import NFTCollection from "../abis/NFTCollection.json";
import Web3 from "web3";
import axios from "../utils/Axios";
import { FactoryAddress } from "../utils/constants";
// import detectEthereumProvider from "@metamask/detect-provider";

let web3;
const mintNFT = async (
  contractAddress,
  name,
  symbol,
  description,
  imageUrl,
  toMint
) => {
  try {
    for (let i = 1; i <= toMint; i++) {
      const nft = await axios({
        method: "post",
        url: "/",
        data: {
          ContractAddress: contractAddress,
          Name: name,
          Symbol: symbol,
          Description: description,
          ImageURL: imageUrl,
          tokenId: i,
        },
      });
    }
  } catch (err) {
    console.log("ERROR", err);
  }
};

const setListing = async (id, action) => {
  try {
    const nft = await axios({
      method: "patch",
      url: `/${id}/?action=${action}`,
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const Web3Context = React.createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [chain, setChain] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    baseURI: "",
    royaltyAddress: "",
    royaltyFee: 0,
    toMint: 0,
  });
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const createNFT = async () => {
    console.log(formData);
    const {
      name,
      symbol,
      description,
      baseURI,
      royaltyAddress,
      royaltyFee,
      toMint,
    } = formData;
    // const provider = await detectEthereumProvider();
    try {
      const abi = NFTFactory.abi;
      const contract = new web3.eth.Contract(abi, FactoryAddress);
      const receipt = await contract.methods
        .createCollection(
          name,
          symbol,
          baseURI,
          web3.utils.toBN(toMint),
          web3.utils.toBN(royaltyFee),
          royaltyAddress
        )
        .send({ from: account });
      console.log(receipt.events);
      //const results = await contract.getPastEvents("Transfer", {});
      const NFTAddress = await contract.methods
        .getCollection(account)
        .call({ from: account });
      console.log(NFTAddress);
      const current = NFTAddress[NFTAddress.length - 1];
      await mintNFT(
        current,
        formData.name,
        formData.symbol,
        formData.description,
        formData.baseURI,
        formData.toMint
      );
      return true;
    } catch (err) {
      console.log("Error : ", err);
      return false;
    }
  };

  const buyNft = async (nft) => {
    try {
      const abi = NFTCollection.abi;
      const address = nft.ContractAddress;
      const contract = new web3.eth.Contract(abi, address);
      let cost = await contract.methods.calPrice(nft.tokenId).call();
      cost = web3.utils.toWei(cost, "ether");
      const receipt = await contract.methods
        .buyNFT(nft.tokenId)
        .send({ from: account, value: cost });
      console.log(receipt);
      setListing(nft._id, "false"); //Unlist item in db
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getPrice = async (nft) => {
    try {
      const abi = NFTCollection.abi;
      const address = nft.ContractAddress;
      const contract = new web3.eth.Contract(abi, address);

      const price = await contract.methods
        .calPrice(nft.tokenId)
        .call({ from: account });
      return price;
    } catch (err) {
      console.log(err);
    }
  };

  const setNFTPrice = async (nft, _price) => {
    try {
      const abi = NFTCollection.abi;
      const address = nft.ContractAddress;
      const contract = new web3.eth.Contract(abi, address);
      await contract.methods
        .setForSale(nft.tokenId, web3.utils.toWei(_price, "ether"))
        .send({ from: account });
      setListing(nft._id, "true"); //List item in db

      console.log("Price Set");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    window.web3 = new Web3(window.ethereum);
    web3 = window.web3;
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        setAccount,
        chain,
        setChain,
        formData,
        handleChange,
        createNFT,
        setFormData,
        buyNft,
        getPrice,
        setNFTPrice,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
