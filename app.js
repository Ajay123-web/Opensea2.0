import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import NFTRoutes from "./routes/NFT.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/NFTs", NFTRoutes);
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongo Connected"))
  .catch((error) => console.log(`${error} did not connect`));

const path = require("path");

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));

//mongoose.set("useFindAndModify", false);
