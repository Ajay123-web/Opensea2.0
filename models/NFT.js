import mongoose from "mongoose";

const NFTSchema = mongoose.Schema({
  ContractAddress: {
    type: String,
    required: true,
  },
  ImageURL: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Symbol: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  isListed: {
    type: Boolean,
    default: false,
  },
  tokenId: {
    type: Number,
  },
  like: {
    type: Number,
    default: 0,
  },
});

var NFT = mongoose.model("NFT", NFTSchema);

export default NFT;
