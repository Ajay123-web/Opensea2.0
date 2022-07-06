import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/Axios";
import NFTImage from "./NFTProps/NFTImage";
import GeneralDetails from "./NFTProps/GeneralDetails";
import ItemActivity from "./NFTProps/ItemActivity";
import Purchase from "./NFTProps/Purchase";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

var precision = 10;
const likes =
  Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) /
  (1 * precision);

function NFTDetails() {
  const { id } = useParams();
  const [nft, setNft] = useState({});

  useEffect(() => {
    async function getNFT() {
      let nft;
      try {
        nft = await axios({
          method: "get",
          url: `/${id}`,
        });
        const obj = nft.data;
        setNft(obj);
      } catch (err) {
        console.log("ERROR", err);
      }
    }
    getNFT();
  }, []);

  return (
    <div className="bg-[#303339]">
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={nft} likes={likes} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={nft} likes={likes} />
              <Purchase nft={nft} />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  );
}

export default NFTDetails;
