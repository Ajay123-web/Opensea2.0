// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface NFTcollection {
    function transferFrom(address _from , address _to , uint _nftId) external;
    function royaltyInfo(uint256 _price) external returns(address , uint256);
}

contract AuctionFactory{
    mapping(address => address) auction;

    function createAuction(uint256 _startingPrice , uint256 _discountRate , 
                           address _nftCollection , uint256 _tokenId) external{

                               DutchAuction newAuction = new DutchAuction(_startingPrice , _discountRate , _nftCollection , _tokenId , msg.sender);
                               auction[msg.sender] = address(newAuction);
    }
}

contract DutchAuction{
    uint256 private constant DURATION = 3; 

    NFTcollection public immutable nftCollection;
    uint256 public immutable tokenId;

    address payable public immutable seller;
    uint256 public immutable startingPrice;
    uint256 public immutable startAt;
    uint256 public immutable expiresAt;
    uint256 public immutable discountRate;
    
    constructor(uint256 _startingPrice , uint256 _discountRate , address _nftCollection , uint256 _tokenId , address _seller){
        require(_startingPrice >= _discountRate * DURATION, "Starting price < min");

        seller = payable(_seller);
        startAt = block.timestamp;
        expiresAt = block.timestamp + DURATION;

        nftCollection = NFTcollection(_nftCollection);
        tokenId = _tokenId;
        startingPrice = _startingPrice;
        discountRate = _discountRate;

    }

    function getPrice() public view returns(uint256){
        uint256 timeElapsed = block.timestamp - startAt;
        uint256 discount = discountRate * timeElapsed;
        return startingPrice - discount;
    }

    function buy() external payable{
        require(block.timestamp < expiresAt , "Auction Expired");
        uint256 price = getPrice();
        require(msg.value == price , "Value not equal to the price");
        nftCollection.transferFrom(seller , msg.sender , tokenId);
        (address royaltyAddress , uint256 royaltyFee) = nftCollection.royaltyInfo(price);
        (bool tx1, ) = payable(royaltyAddress).call{value: royaltyFee}("");
        require(tx1 , "Transaction failed");
        selfdestruct(seller);
    }
}