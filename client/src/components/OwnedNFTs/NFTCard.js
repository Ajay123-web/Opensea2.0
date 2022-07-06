import React, { useState, useEffect, useContext } from "react";
import { Web3Context } from "../../context/StateProvider";
import ethereumLogo from "../../assets/ethereum.svg";
import toast, { Toaster } from "react-hot-toast";

const style = {
  button: `mx-3 w-[150px] flex items-center py-2 px-6 rounded-lg cursor-pointer`,
  buttonText: `ml-2 text-lg font-semibold`,
};

function NFTCard({ nftItem }) {
  const { chain, getPrice, setNFTPrice } = useContext(Web3Context);
  const [price, setPrice] = useState(0);
  const [changePrice, setChangePrice] = useState(0);
  const [priceDiv, setPriceDiv] = useState(false);
  const [tx, setTx] = useState(false);

  const success = (toastHandler = toast) => {
    toastHandler.success(`Price Set (NFT Listed)!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };
  const error = (toastHandler = toast) => {
    toastHandler.error(`Something went wrong!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };
  const errorChain = (toastHandler = toast) => {
    toastHandler.error(`Connect to Ropsten chain!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chain === "3") {
      setTx(true);
      const x = document.getElementById("price");
      x.value = "";
      const res = await setNFTPrice(nftItem, changePrice);
      setTx(false);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setPrice(changePrice);
      res ? success() : error();
    } else {
      errorChain();
    }
  };

  useEffect(() => {
    async function findPrice() {
      const _price = await getPrice(nftItem);
      setPrice(_price);
    }
    findPrice();
  }, []);
  return (
    <div
      className={`border-[1px] bg-[#303339] min-w-[300px] max-w-[300px] flex-auto ${
        priceDiv ? "h-[550px]" : "h-[450px]"
      } my-10 mx-5 rounded-2xl overflow-hidden hover:shadow-2xl`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-[300px] w-full overflow-hidden cursor-pointer flex justify-center items-center transform transition duration-500 hover:scale-110">
        {" "}
        <img
          src={nftItem.ImageURL}
          alt="OwnedNFT"
          className="w-full object-contain"
        />
      </div>
      <div className="flex justify-between mx-[10px] my-[5px]">
        <div className="font-semibold text-gray-400">{nftItem.Name}</div>
        <div className="flex justify-center items-center font-semibold text-gray-400">
          <img src={ethereumLogo} alt="Logo" className="h-5 mt-[3px]" />{" "}
          <div className="mb-[3px]">{price}</div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          onClick={() => {
            setPriceDiv(!priceDiv);
          }}
          className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
        >
          <div className={style.buttonText}>Set Price</div>
        </div>
        <div
          className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
        >
          <div className={style.buttonText}>Set Auction</div>
        </div>
      </div>
      {priceDiv && (
        <div className="flex flex-col justify-center items-center">
          <input
            placeholder="Set Price of NFT(ether)"
            type="Number"
            id="price"
            step="1"
            min="0"
            className="border-[1px] border-gray-500 w-[270px] my-[15px] p-[10px] rounded-md outline-none required={true} hover:shadow-2xl"
            onChange={(e) => setChangePrice(e.target.value)}
          />
          <button
            className="mt-[15px] w-[150px] p-[5px] rounded-md bg-gradient-to-r from-indigo-500 to-blue-500"
            onClick={handleSubmit}
          >
            {tx ? "Processing..." : "Set"}
          </button>
        </div>
      )}
    </div>
  );
}

export default NFTCard;
