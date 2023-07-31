// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


import "./whiteList.sol";




contract CryptoDove is ERC721Enumerable,  Ownable{
    uint256 constant public _price = 0.01 ether;

    uint256 constant public _maxToken = 20;

    WhiteList whitelist;

    uint256 public reservedToken;
    uint256 public reservedTokenClaimed = 0;

    constructor (address whitelistContract) ERC721 ("cryptodove",  "Cdove") {
        whitelist = WhiteList(whitelistContract);
        reservedToken = whitelist.maxWhiteListedAdresses();
        
    }

    function mint() public payable {
        require(totalSupply() + reservedToken - reservedTokenClaimed < _maxToken, "cant mint ");

        if ( whitelist.whiteListedAdresses(msg.sender) && msg.value < _price){

            require(balanceOf(msg.sender)== 0, "already owned");

            reservedTokenClaimed += 1;
        }else {
            require(msg.value >= _price, "Not enough funds");

        }
        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId);

    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent,) = _owner.call{value: amount}("");
        require(sent, "failed to send ether");
    }


}