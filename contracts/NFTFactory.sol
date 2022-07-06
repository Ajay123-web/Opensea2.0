// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCollection.sol";
contract NFTFactory{
    mapping(address => address[]) private collections;
    address[] private collectionList;

    function createCollection(string memory _name , string memory _symbol , string memory _baseURI , 
                uint256 _count , uint96 _royaltyFeesInBips , address _royaltyAddress) external{
                    NFTCollection newCollection = new NFTCollection(_name , _symbol , msg.sender , _baseURI ,
                                                                    _count , _royaltyFeesInBips , _royaltyAddress);
                    collectionList.push(address(newCollection));
                    collections[msg.sender].push(address(newCollection));
                }
            
    function getCollections() external view returns(address[] memory){
        return collectionList;
    }

    function getCollection(address _artist) view external returns(address[] memory){
        return collections[_artist];
    }
}