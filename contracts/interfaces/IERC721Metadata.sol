// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "./IERC721.sol";

interface IERC721Metadata {
    function Name() external view returns (string memory);
    function Symbol() external view returns (string memory);
    function tokenURI(uint256 tokenId) external view returns (string memory);
}
