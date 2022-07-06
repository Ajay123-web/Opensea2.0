import { useEffect, useState, useContext } from "react";
import { Web3Context } from "../../context/StateProvider";
import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
};

const MakeOffer = ({ nft }) => {
  const { chain, buyNft } = useContext(Web3Context);

  const NFTSuccess = (toastHandler = toast) => {
    toastHandler.success(`NFT bought!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };
  const NFTError = (message, toastHandler = toast) => {
    toastHandler.error(`${message}`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };

  const handleSubmit = async () => {
    if (chain !== "3") {
      const res = await buyNft(nft);
      if (res) {
        NFTSuccess();
      } else {
        NFTError("Something went wrong");
      }
    } else {
      NFTError("Connect to Ropsten chain!");
    }
  };
  return (
    <div className="flex h-20 w-full justify-center items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
        <IoMdWallet className={style.buttonIcon} />
        <div className={style.buttonText}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
      <div
        className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
      >
        <HiTag className={style.buttonIcon} />
        <div className={style.buttonText}>Make Offer</div>
      </div>
    </div>
  );
};

export default MakeOffer;
