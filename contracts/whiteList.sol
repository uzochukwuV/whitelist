// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract WhiteList {

    uint8 public maxWhiteListedAdresses;
    //always use public so as to be accessed in other files

    mapping (address => bool) public whiteListedAdresses;

    uint8 public numAddressesWhiteListed;

    constructor( uint8 _maxWhiteListedAdresses) {
        maxWhiteListedAdresses = _maxWhiteListedAdresses;
    }

    function addAddressToWhiteList( )  public {
        require(!whiteListedAdresses[msg.sender], "This account has already been white listed");

        require(numAddressesWhiteListed < maxWhiteListedAdresses, "More addresses cant be white listed, limit reached");

        whiteListedAdresses[msg.sender] = true;
        numAddressesWhiteListed += 1;
    }
}