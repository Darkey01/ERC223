pragma solidity ^0.4.21;
 
 
import "./EIP20Interface.sol";
 
 
contract Ico {
   
    address receiver;
    uint rate = 1 finney;
    EIP20Interface tokenReceived;
    EIP20Interface tokenGiven;
   
    constructor(address _tokenReceived, address _tokenGiven) public {
        receiver = msg.sender;
        tokenReceived = EIP20Interface(_tokenReceived);
        tokenGiven = EIP20Interface(_tokenGiven);
    }
   
   function tokenFallback( address _from, uint _value, bytes data) public{
       uint tokenEarned = _value / rate;
       require(tokenReceived.transfer( receiver, _value));
       require(tokenGiven.transfer( _from ,tokenEarned));
    }
 } 