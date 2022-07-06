import express from "express";

import {
  createNFT,
  getNFTs,
  getNFT,
  setListing,
  getAssets,
} from "../controller/NFT.js";

const router = express.Router();

router.get("/", getNFTs);
router.get("/:id", getNFT);
router.get("/:id/:address", getAssets);
router.post("/", createNFT);
router.patch("/:id", setListing);
export default router;
