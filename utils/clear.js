import mongoose from "mongoose";
//const fs = require("fs");
import NFT from "../models/NFT.js";

const CONNECTION_URL =
  "mongodb+srv://memories-project:Ajay123@cluster0.lltvl.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log("DB connection Successful");
  });

//Importing Data
// const importData = async () => {
//   try {
//     await NFT.create(NFTs);
//     //console.log('Data successfully added!');
//     process.exit();
//   } catch (err) {
//     //console.log(err);
//   }
// };
//Deleting previous data
const deleteData = async () => {
  try {
    await NFT.deleteMany();
    //console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    //console.log(err);
  }
};
if (process.argv[2] === "--import") {
  //importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
//console.log(process.argv);
