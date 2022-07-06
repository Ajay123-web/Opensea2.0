import React, { useEffect, useState, useContext } from "react";
import NFTCard from "./NFTCard";
import axios from "../utils/Axios";
import { Web3Context } from "../context/StateProvider";

const style = {
  bannerImageContainer: `w-screen flex justify-center items-center`,
  bannerImage: `h-[40vh] w-full object-cover`,
};

const Collection = () => {
  const [nfts, setNfts] = useState([]);
  const { chain } = useContext(Web3Context);
  useEffect(() => {
    async function getNFTs() {
      let nfts;
      try {
        nfts = await axios({
          method: "get",
          url: "/",
        });
        const arrayObj = nfts.data;
        setNfts(arrayObj);
      } catch (err) {
        console.log("ERROR", err);
      }
    }
    getNFTs();
  }, []);

  return (
    <>
      {nfts.length === 0 ? (
        <div className="h-[100vh] text-5xl font-bold flex flex-col items-center justify-center m-[20px] border-[1px] border-gray-300 rounded-md bg-gray-200">
          <div>Currently no listed NFT on this chain.</div>
          <div className="text-2xl mt-[30px] font-semibold ">
            (Mint your own NFTs by clicking on Create.)
          </div>
        </div>
      ) : (
        <div>
          <div className={style.bannerImageContainer}>
            <img
              className={style.bannerImage}
              src="https://openseauserdata.com/files/df820355a08bad7acb86d33b88945081.jpg"
              alt="banner"
            />
          </div>
          <div className="flex flex-wrap ">
            {nfts.map((nftItem, id) => (
              <NFTCard key={id} nftItem={nftItem} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;
