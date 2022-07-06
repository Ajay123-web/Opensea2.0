import React, { useContext, useState } from "react";
import { Web3Context } from "../context/StateProvider";
import { AiOutlineMenu } from "react-icons/ai";
import ethereumLogo from "../assets/ethereum.svg";
import { BsShareFill } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import EmptyBox from "./EmptyBox.js";
import NFT from "./OwnedNFTs/NFT";

const style = {
  bannerImageContainer: `h-[30vh] w-screen bg-[#f2f7f4] hover:bg-[#e1f0e7] overflow-hidden flex justify-center items-center`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-start text-white`,
};

const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

function Account() {
  const { account } = useContext(Web3Context);
  const [op1, setOp1] = useState(true);
  const [op2, setOp2] = useState(false);
  const [op3, setOp3] = useState(false);
  const [op4, setOp4] = useState(false);

  return (
    <div>
      <div className={style.bannerImageContainer}></div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <div className="w-[175px] h-[175px] object-cover rounded-full border-[5px] border-[#FFFFFF] mt-[-9rem] bg-[#fcb603] ml-[30px] shadow-2xl"></div>
        </div>
        <div className="flex justify-between ml-[55px] mr-[100px] my-[15px]">
          <div className="flex flex-col">
            <div className="text-3xl font-semibold">Unnamed</div>
            <div className="flex my-[10px]">
              <img src={ethereumLogo} alt="eth" className="h-7" />
              <div className="mx-[10px]">{shortenAddress(account)}</div>
              <div className="opacity-75 mx-[30px]">Joined June 2022</div>
            </div>
          </div>
          <div className="flex justify-evenly">
            <BsShareFill className="mx-[30px]" />
            <AiOutlineMenu className="ml-[30px]" />
          </div>
        </div>
        <div className="flex items-center ml-[40px]">
          <div
            className={`p-[15px] text-lg font-semibold ${
              op1 ? "" : "opacity-75"
            } hover:bg-[#f2f7f4] cursor-pointer`}
            onClick={() => {
              setOp1(true);
              setOp2(false);
              setOp3(false);
              setOp4(false);
            }}
          >
            Owned
          </div>
          <div
            className={`p-[15px] text-lg mx-[20px] font-semibold ${
              op2 ? "" : "opacity-75"
            } hover:bg-[#f2f7f4] cursor-pointer`}
            onClick={() => {
              setOp1(false);
              setOp2(true);
              setOp3(false);
              setOp4(false);
            }}
          >
            Created
          </div>
          <div
            className={`p-[15px] text-lg mx-[20px] font-semibold ${
              op3 ? "" : "opacity-75"
            } hover:bg-[#f2f7f4] cursor-pointer`}
            onClick={() => {
              setOp1(false);
              setOp2(false);
              setOp3(true);
              setOp4(false);
            }}
          >
            Favorited
          </div>
          <div
            className={`p-[15px] text-lg mx-[20px] font-semibold ${
              op4 ? "" : "opacity-75"
            } hover:bg-[#f2f7f4] cursor-pointer`}
            onClick={() => {
              setOp1(false);
              setOp2(false);
              setOp3(false);
              setOp4(true);
            }}
          >
            Activity
          </div>
          <div
            className={`p-[15px] text-lg ml-[20px] font-semibold opacity-75 hover:bg-[#f2f7f4] cursor-pointer`}
          >
            More
          </div>
          <div>
            <AiOutlineDown />
          </div>
        </div>
        {op1 ? <NFT /> : <EmptyBox />}
      </div>
    </div>
  );
}

export default Account;
