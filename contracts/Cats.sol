pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title Cats NFT
 * @dev ERC721
 */
contract Cats is ERC721Token("Cats", "CAT"), Ownable {

    function mint(address _to, string _tokenURI) public onlyOwner {
        uint256 newTokenId = _getNextTokenId();
        super._mint(_to, newTokenId);
        super._setTokenURI(newTokenId, _tokenURI);
    }

    function setTokenURI(uint256 _tokenId, string _uri) public onlyOwner {
        super._setTokenURI(_tokenId, _uri);
    }

    /**
    * @dev calculates the next token ID based on totalSupply
    * @return uint256 for the next token ID
    */
    function _getNextTokenId() private view returns (uint256) {
        return totalSupply().add(1); 
    }
}