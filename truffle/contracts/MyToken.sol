// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 public constant EXCHANGE_RATE = 10;
    struct Record{
        uint256 token;
        string creationTime;
    }
    struct TransferRecord{
        address to;
        uint256 token;
        string creationTime;
    }
    struct TakeRecord{
        address from;
        uint256 token;
        string creationTime;
    }
    mapping(address => Record[]) buyRecord;
    mapping(address => Record[]) sellRecord;
    mapping(address => TransferRecord[]) transferRecord;
    mapping(address => TakeRecord[]) takeRecord;

    constructor() payable ERC20("Appreciate citizens", "AC") {
        _mint(address(this), 10000000 * (10 ** decimals()));
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    receive() external payable {}
    
    function buyToken(string memory _creationTime) external payable {
        require(msg.value/ 10**18 > 0, "Invalid amount of ether");
        uint256 tokenAmount = msg.value/ 10**18 * EXCHANGE_RATE;
        _transfer(address(this), msg.sender, tokenAmount);
        buyRecord[msg.sender].push(Record(tokenAmount,_creationTime));
    }

    function sellToken(uint256 _tokenAmount,string memory _creationTime) external {
        require(_tokenAmount > 0, "Invalid amount of token");
        uint256 etherAmount = _tokenAmount / EXCHANGE_RATE * 1 ether;
        require(payable(address(this)).balance >= etherAmount, "Insufficient balance");
        _transfer(msg.sender, payable(address(this)), _tokenAmount);
        payable(msg.sender).transfer(etherAmount);
        sellRecord[msg.sender].push(Record(etherAmount/ 10**18,_creationTime));
    }
    
    function Recordtransfer(address to, uint256 value,string memory _creationTime) public{
        address owner = _msgSender();
        _transfer(owner, to, value);
        transferRecord[msg.sender].push(TransferRecord(to,value,_creationTime));
        takeRecord[to].push(TakeRecord(owner,value,_creationTime));
    }


    // 取得買AC代幣紀錄
    function getBuyRecord() external view returns (Record[] memory){
        return buyRecord[msg.sender];
    }
    // 取得AC換ETH代幣紀錄
    function getSellRecord() external view returns (Record[] memory){
        return sellRecord[msg.sender];
    }
    // 取得轉帳紀錄
    function getTransferRecord() external view returns (TransferRecord[] memory){
        return transferRecord[msg.sender];
    }
    // 取得領錢紀錄
    function getTakeRecord() external view returns (TakeRecord[] memory){
        return takeRecord[msg.sender];
    }
}