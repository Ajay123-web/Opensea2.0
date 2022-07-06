// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721.sol";

contract NFTCollection is ERC721{
    address public artist;
    string public baseURI;
    uint256 public tokenNo = 0;
    uint96 public royaltyFeesInBips;
    address public royaltyAddress;
    mapping(uint256 => uint256) public tokenPrice;
    
    constructor(string memory _name , string memory _symbol , address _artist , string memory _baseURI , 
                uint256 _count , uint96 _royaltyFeesInBips , address _royaltyAddress) ERC721(_name , _symbol) {
                    artist = _artist;
                    baseURI = _baseURI;
                    royaltyFeesInBips = _royaltyFeesInBips;
                    royaltyAddress = _royaltyAddress;
                    
                    mint(_count);
                }

    function mint(uint256 _count) private{
        for(uint256 i = 0; i < _count; i++) {
            tokenNo++;
            _mint(artist , tokenNo);
        }
    }

    function setForSale(uint256 _tokenId , uint256 _price) external{
        require(_isApprovedOrOwner(msg.sender , _tokenId) , "Sender is not allowed for this action");
        require(_price > 0 , "Price should be greater than 0");
        tokenPrice[_tokenId] = _price;
    }

    function removeFromSale(uint256 _tokenId) external{
        require(_isApprovedOrOwner(msg.sender , _tokenId) , "Sender is not allowed for this action");
        tokenPrice[_tokenId] = 0;
    }

    function buyNFT(uint256 _tokenId) external payable {
        uint256 price = calPrice(_tokenId);
        require(price > 0, "Not valid for buying");
        require(msg.value >= price , "NFT: Value not equal to the price.");
        address seller = ownerOf(_tokenId);
        _transfer(seller , msg.sender , _tokenId);
        tokenPrice[_tokenId] = 0;      //disable buy
        uint256 royaltyFee = calRoyalty(price);
        (bool tx1,) = payable(royaltyAddress).call{value: royaltyFee}("");
        require(tx1 , "Transaction failed");
        uint256 NFTPrice = price - royaltyFee;
        (bool tx2,) = payable(seller).call{value: NFTPrice}("");
        require(tx2 , "Transaction failed");
    }

    function royaltyInfo(uint256 _price) external view returns(address , uint256){
        return (royaltyAddress , calRoyalty(_price));
    }

    function calPrice(uint256 _tokenId) public view returns(uint256){
        uint256 _price = tokenPrice[_tokenId];
        return _price + calRoyalty(_price);
    }
    function calRoyalty(uint256 _price) public view returns(uint256){
        return (_price * royaltyFeesInBips)/10000;
    }

    function allTokensOfOwner(address _owner) external view returns(uint256[10] memory) {
        //uint256 totalTokens = balances[_owner];
        uint256[10] memory tokenList;
        for(uint256 i = 0; i < tokenNo; i++){
            if(owner[i + 1] == _owner){
                tokenList[i] = 1;
            }else{
                tokenList[i] = 0;
            }
        }
        return tokenList;
    }

    function supportsInterface(bytes4 interfaceId) public view override returns (bool){
        return interfaceId == 0x2a55205a || super.supportsInterface(interfaceId);
    }
}