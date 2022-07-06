import React, { useEffect, useContext, useState } from "react";
import NFTCard from "./NFTCard";
import axios from "../../utils/Axios";
//import Web3 from "web3";
import NFTFactory from "../../abis/NFTFactory.json";
import NFTCollection from "../../abis/NFTCollection.json";
import { Web3Context } from "../../context/StateProvider";
import { FactoryAddress } from "../../utils/constants";
import EmptyBox from "../EmptyBox.js";
import GetWeb3 from "../../utils/web3.js";

function NFT() {
  const { account } = useContext(Web3Context);
  const [userNFTs, setUserNfts] = useState([]);

  useEffect(() => {
    const findAssets = async (contractAddress, token) => {
      try {
        const nft = await axios({
          method: "get",
          url: `/${token}/${contractAddress}`,
        });
        // console.log(nft.data);
        setUserNfts((userNFTs) => [...userNFTs, nft.data]);
      } catch (err) {
        console.log(err);
      }
    };
    const userAssets = async () => {
      try {
        // const provider = await detectEthereumProvider();
        const web3 = GetWeb3();
        // window.web3 = new Web3(window.ethereum);
        // const web3 = window.web3;
        const FactoryAbi = NFTFactory.abi;
        const FactoryContract = new web3.eth.Contract(
          FactoryAbi,
          FactoryAddress
        );

        const CollectionAbi = NFTCollection.abi;
        const collections = await FactoryContract.methods
          .getCollections()
          .call({ from: account });
        for (let i = 0; i < collections.length; i++) {
          const contract = new web3.eth.Contract(CollectionAbi, collections[i]);
          const tokens = await contract.methods
            .allTokensOfOwner(account)
            .call({ from: account });
          for (let j = 0; j < 10; j++) {
            if (tokens[j] === "1") {
              await findAssets(collections[i], j + 1);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    userAssets();
  }, []);
  return (
    <div className="">
      <div className="flex flex-wrap ">
        {userNFTs.length === 0 ? (
          <>
            {" "}
            <EmptyBox />{" "}
          </>
        ) : (
          <>
            {userNFTs.map((nftItem, id) => (
              <NFTCard key={id} nftItem={nftItem} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default NFT;
