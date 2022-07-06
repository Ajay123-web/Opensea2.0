import mongoose from "mongoose";
import NFT from "../models/NFT.js";

export const getNFTs = async (req, res) => {
  try {
    const NFTs = await NFT.find({ isListed: true }).sort({
      likes: -1,
      createdAt: -1,
    });

    res.status(200).json(NFTs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getNFT = async (req, res) => {
  try {
    const { id } = req.params;
    const Nft = await NFT.findById(id);

    res.status(200).json(Nft);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAssets = async (req, res) => {
  try {
    const { id, address } = req.params;
    const Nft = await NFT.findOne({
      ContractAddress: address,
      tokenId: id,
    });

    res.status(200).json(Nft);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createNFT = async (req, res) => {
  try {
    console.log(req.body);
    const doc = await NFT.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const setListing = async (req, res) => {
  const { id } = req.params;
  const { action } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Not a valid ID" });
  try {
    const doc = await NFT.findByIdAndUpdate(
      id,
      {
        isListed: action,
      },
      { new: true }
    );
    res.status(200).json({ data: doc });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
