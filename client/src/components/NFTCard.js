import { useEffect, useState, useContext } from "react";
import ethereumLogo from "../assets/ethereum.svg";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { Web3Context } from "../context/StateProvider";

var precision = 10;

const style = {
  wrapper: `border-[1px] bg-[#303339] min-w-[300px] max-w-[300px] flex-auto w-[100px] h-[400px] my-10 mx-5 rounded-2xl overflow-hidden hover:shadow-2xl`,
  imgContainer: `h-2/3 w-full overflow-hidden cursor-pointer flex justify-center items-center transform transition duration-500 hover:scale-110`,
  nftImg: `w-full object-contain`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `flex justify-center items-center font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex text-xl font-bold mt-2`,
  ethLogo: `h-7 mt-[5px]`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2 mt-[7px]`,
};

const showID = (id_) => {
  if (id_ < 10) return "#000" + id_;
  if (id_ < 100) return "#00" + id_;
};

const NFTCard = ({ nftItem }) => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [like, setLike] = useState(false);

  const { getPrice } = useContext(Web3Context);

  const Like = (e) => {
    e.preventDefault();
    setLike(!like);
  };
  const NFTdetail = (e) => {
    e.preventDefault();
    navigate(`/nft/${nftItem._id}`);
  };

  useEffect(() => {
    async function findPrice() {
      const _price = await getPrice(nftItem);
      //console.log("Price: ", _price);
      setPrice(_price);
    }
    findPrice();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer} onClick={(e) => NFTdetail(e)}>
        <img
          src={nftItem.ImageURL}
          alt={nftItem.Name}
          className={style.nftImg}
        />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{nftItem.Name}</div>
            <div className={style.assetName}>{showID(nftItem.tokenId)}</div>
          </div>
          {nftItem.isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img src={ethereumLogo} alt="eth" className={style.ethLogo} />
                <div className="mb-[5px]">{price}</div>
              </div>
            </div>
          )}
        </div>
        <div className={style.likes}>
          <button onClick={(e) => Like(e)}>
            {like ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>{" "}
          <div className="ml-[8px]">
            {Math.floor(
              Math.random() * (10 * precision - 1 * precision) + 1 * precision
            ) /
              (1 * precision)}
            K
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
