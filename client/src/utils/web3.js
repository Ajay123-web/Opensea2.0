import Web3 from "web3";

function GetWeb3() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URL)
  );
  return web3;
}
export default GetWeb3;
