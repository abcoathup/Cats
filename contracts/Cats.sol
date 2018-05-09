pragma solidity 0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";


/**
 * @title Cats NFT
 * @dev ERC721
 */
contract Cats is ERC721Token {
    constructor() public 
    
    ERC721Token("Cats", "CAT")
    { 
    }

    function mint(address _to, uint256 _tokenId) public {
        super._mint(_to, _tokenId);
    }

    function setTokenURI(uint256 _tokenId, string _uri) public {
        super._setTokenURI(_tokenId, _uri);
    }
}