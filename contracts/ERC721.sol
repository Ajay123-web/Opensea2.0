// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; //version of solidity
import "./libraries/Strings.sol";
import "./interfaces/IERC721.sol";
import "./libraries/Address.sol";
import "./interfaces/IERC721Receiver.sol";
import "./interfaces/IERC721Metadata.sol";
import "./ERC165.sol";

contract ERC721 is ERC165 , IERC721 , IERC721Metadata{
    using Strings for uint256;
    using Address for address;

    string private name;
    string private symbol;
    
    mapping(uint256 => address) owner;
    mapping(address => uint256) balances;
    mapping(uint256 => address) tokenApprovals;
    mapping(address => mapping(address => bool)) operatorApproval;

    constructor(string memory _name , string memory _symbol){
        name = _name;
        symbol = _symbol;
    }

    function Name() public view virtual override returns(string memory){
        return name;
    }

    function Symbol() public view virtual override returns(string memory){
        return symbol;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns(string memory){
        require(_exists(_tokenId) , "ERC721: URI query for an invalid token");
        string memory baseURI = _baseURI();
        //abi.encode
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, _tokenId.toString())) : "";
    }

    function _exists(uint256 _tokenId) internal view returns(bool){
        return owner[_tokenId] != address(0);
    }

    function _baseURI() internal pure returns (string memory) {
        return "";                         //mention the base URI for the storage of metadata of NFTs
    }

    function balanceOf(address _owner) public view virtual override returns (uint256){
        require(_owner != address(0) , "ERC721: Not a valid owner");
        return balances[_owner];
    }

    function ownerOf(uint256 _tokenId) public view virtual override returns (address){
        address _owner = owner[_tokenId];
        require(_owner != address(0) , "ERC721: Invalid token ID");
        return _owner;
    }

    function approve(address _to , uint256 _tokenId) public virtual override{
        address _owner = ownerOf(_tokenId);
        require(_to != _owner, "ERC721: Approval to current owner");
        require(msg.sender == _owner || isApprovedForAll(_owner , msg.sender),
            "ERC721: approve caller is not token owner nor approved for all"
        );

        _approve(_to , _tokenId);
    }
    function _approve(address _to , uint256 _tokenId) internal{
        tokenApprovals[_tokenId] = _to;
        emit Approval(ownerOf(_tokenId) , _to , _tokenId);
    }

    function getApproved(uint256 _tokenId) public view virtual override returns (address operator){
        return tokenApprovals[_tokenId];
    }

    function isApprovedForAll(address _owner , address _operator) public view virtual override returns(bool){
        return operatorApproval[_owner][_operator];
    }

    function setApprovalForAll(address _operator, bool _approved) public virtual override {
        _setApprovalForAll(msg.sender , _operator , _approved);
    }
    function _setApprovalForAll(address _owner , address _operator , bool _approved) internal virtual {
        require(_owner != _operator, "ERC721: approve to caller");
        operatorApproval[_owner][_operator] = _approved;
        emit ApprovalForAll(_owner , _operator , _approved);
    }

    function transferFrom(address _from , address _to , uint256 _tokenId) public virtual override {
        require(_isApprovedOrOwner(msg.sender , _tokenId), "ERC721: caller is not token owner nor approved");

        _transfer(_from , _to , _tokenId);
    }

    function _isApprovedOrOwner(address _spender , uint256 _tokenId) internal view virtual returns(bool){
        address _owner = ownerOf(_tokenId);
        return (_spender == _owner || isApprovedForAll(_owner , _spender) || getApproved(_tokenId) == _spender);
    }

    function _transfer(address _from , address _to , uint256 _tokenId) internal virtual {
        require(ownerOf(_tokenId) == _from, "ERC721: transfer from incorrect owner");
        require(_to != address(0), "ERC721: transfer to the zero address");

        _approve(address(0), _tokenId);     //remove the previous approval of _tokenId

        balances[_from] -= 1;
        balances[_to] += 1;
        owner[_tokenId] = _to;

        emit Transfer(_from , _to , _tokenId);
    }

    function safeTransferFrom(address _from , address _to , uint256 _tokenId) public virtual override {
        safeTransferFrom(_from , _to , _tokenId , "");
    }

    function safeTransferFrom(address _from , address _to , uint256 _tokenId , bytes memory _data) public virtual override {
        require(_isApprovedOrOwner(msg.sender , _tokenId), "ERC721: caller is not token owner nor approved");
        _safeTransfer(_from , _to , _tokenId , _data);
    }

    function _safeTransfer(address _from , address _to , uint256 _tokenId , bytes memory _data) internal virtual {
        _transfer(_from , _to , _tokenId);
        require(_checkOnERC721Received(_from , _to , _tokenId , _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    function _mint(address _to , uint256 _tokenId) internal virtual{
        require(_to != address(0), "ERC721: mint to the zero address");
        require(!_exists(_tokenId), "ERC721: token already minted");

        balances[_to] += 1;
        owner[_tokenId] = _to;

        emit Transfer(address(0) , _to , _tokenId);
    }

    function _burn(uint256 _tokenId) internal virtual {
        require(_isApprovedOrOwner(msg.sender , _tokenId), "ERC721: caller is not token owner nor approved");
        address _owner = ownerOf(_tokenId);

        _approve(address(0) , _tokenId); //clear approval

        balances[_owner] -= 1;
        delete owner[_tokenId];

        emit Transfer(_owner , address(0) , _tokenId);
    }

    function _checkOnERC721Received(address _from , address _to , uint256 _tokenId , bytes memory _data) private returns (bool){
        if (_to.isContract()) {
            try IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    /// @solidity memory-safe-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    
}