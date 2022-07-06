import { IoMdSnow } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";

const style = {
  topBar: `bg-[#303339] w-[30vw] p-2 rounded-t-lg border-[#151c22] border`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end`,
};

const NFTImage = ({ selectedNft, likes }) => {
  return (
    <div>
      <div className={style.topBar}>
        <div className={style.topBarContent}>
          <IoMdSnow />
          <div className={style.likesCounter}>
            <AiOutlineHeart />
            <span className="ml-[5px]">{likes}K</span>
          </div>
        </div>
      </div>
      <div>
        <img src={selectedNft?.ImageURL} className="w-[30vw]" />
      </div>
    </div>
  );
};

export default NFTImage;
