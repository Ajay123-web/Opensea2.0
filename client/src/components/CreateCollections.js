import React, { useContext } from "react";
import { Web3Context } from "../context/StateProvider";
import toast, { Toaster } from "react-hot-toast";

const Input = ({ placeholder, name, id, type, step, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    id={id}
    min="0"
    step={step}
    onChange={(e) => handleChange(e, name)}
    className="border-[1px] border-gray-500 w-[50vw] p-[10px] rounded-md outline-none required={true} hover:shadow-2xl"
  />
);

function CreateCollections() {
  const { chain, formData, handleChange, createNFT, setFormData } =
    useContext(Web3Context);

  const NFTSuccess = (toastHandler = toast) => {
    toastHandler.success(`Collection Created!`, {
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

  const checkFields = () => {
    if (
      !formData.name ||
      !formData.symbol ||
      !formData.description ||
      !formData.baseURI ||
      !formData.royaltyAddress ||
      !formData.royaltyFee ||
      !formData.toMint
    )
      return false;
    return true;
  };
  const helper = (field) => {
    const x = document.getElementById(`${field}`);
    x.value = "";
  };
  const resetInputField = () => {
    helper("name");
    helper("symbol");
    helper("description");
    helper("baseURI");
    helper("royaltyAddress");
    helper("royaltyFee");
    helper("toMint");
  };

  const clearFormData = () => {
    setFormData((prevState) => ({ ...prevState, name: "" }));
    setFormData((prevState) => ({ ...prevState, symbol: "" }));
    setFormData((prevState) => ({ ...prevState, description: "" }));
    setFormData((prevState) => ({ ...prevState, baseURI: "" }));
    setFormData((prevState) => ({ ...prevState, royaltyAddress: "" }));
    setFormData((prevState) => ({ ...prevState, royaltyFee: "" }));
    setFormData((prevState) => ({ ...prevState, toMint: "" }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    resetInputField();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const res = await createNFT();
    res ? NFTSuccess() : NFTError("Something went wrong");

    clearFormData();
  };
  return (
    <>
      {chain === "3" ? (
        <div className="flex justify-center">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="mt-[50px] flex flex-col justify-center items-start">
            <div className="text-5xl font-extrabold">
              Create Your own NFT Collection
            </div>
            <form className="mt-[40px] flex flex-col">
              <div className="flex flex-col items-start w-[55vw] my-[15px]">
                <div className="text-lg font-semibold mb-[5px]">
                  Name<span className="text-red-500"> *</span>
                </div>
                <Input
                  placeholder="Name"
                  name="name"
                  id="name"
                  type="text"
                  step=""
                  handleChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-start w-[55vw] my-[15px]">
                <div className="text-lg font-semibold mb-[5px]">
                  Symbol<span className="text-red-500"> *</span>
                </div>
                <Input
                  placeholder="Symbol"
                  name="symbol"
                  id="symbol"
                  type="text"
                  step=""
                  handleChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-start w-[55vw] my-[15px]">
                <div className="text-lg font-semibold mb-[5px]">
                  Description<span className="text-red-500"> *</span>
                </div>
                <Input
                  placeholder="Description of Collection (max 100 words)"
                  name="description"
                  id="description"
                  type="text"
                  step=""
                  handleChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-start w-[55vw] my-[15px]">
                <div className="text-lg font-semibold mb-[5px]">
                  Base URI<span className="text-red-500"> *</span>
                </div>
                <Input
                  placeholder="Base URL of NFT cloud storage"
                  name="baseURI"
                  id="baseURI"
                  type="url"
                  step=""
                  handleChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-start w-[55vw] my-[15px]">
                <div className="text-lg font-semibold mb-[5px]">
                  Royalty Wallet Address<span className="text-red-500"> *</span>
                </div>
                <Input
                  placeholder="Royalty Wallet Address"
                  name="royaltyAddress"
                  id="royaltyAddress"
                  type="text"
                  step=""
                  handleChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-start w-[55vw] my-[15px]">
                <div className="text-lg font-semibold mb-[5px]">
                  Royalty Fees<span className="text-red-500"> *</span>
                </div>
                <Input
                  placeholder="Royalty Fees in BIPS"
                  name="royaltyFee"
                  id="royaltyFee"
                  type="number"
                  step="1"
                  handleChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-start w-[55vw] my-[15px]">
                <div className="text-lg font-semibold mb-[5px]">
                  NFT's to Mint<span className="text-red-500"> *</span>
                </div>
                <Input
                  placeholder="NFT's to Mint"
                  name="toMint"
                  id="toMint"
                  type="number"
                  step="1"
                  handleChange={handleChange}
                />
              </div>

              <button
                className={`my-[15px] w-[125px] p-[15px] rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 ${
                  checkFields() ? "" : "disabled opacity-75 cursor-not-allowed"
                }`}
                onClick={handleSubmit}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex h-[100vh] text-5xl font-bold text-white bg-[#303339] justify-center items-center">
          <div> Connect to Ropsten chain </div>
        </div>
      )}
    </>
  );
}

export default CreateCollections;
