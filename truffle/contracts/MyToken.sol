// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 public constant EXCHANGE_RATE = 10;

    constructor() payable ERC20("Appreciate citizens", "AC") {
        _mint(address(this), 10000000 * (10 ** decimals()));
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    receive() external payable {}
    
    function buyToken() external payable {
        require(msg.value/ 10**18 > 0, "Invalid amount of ether");
        uint256 tokenAmount = msg.value/ 10**18 * EXCHANGE_RATE;
        _transfer(address(this), msg.sender, tokenAmount);
    }

    function sellToken(uint256 _tokenAmount) external {
        require(_tokenAmount > 0, "Invalid amount of token");
        uint256 etherAmount = _tokenAmount / EXCHANGE_RATE * 1 ether;
        require(payable(address(this)).balance >= etherAmount, "Insufficient balance");
        _transfer(msg.sender, payable(address(this)), _tokenAmount);
        payable(msg.sender).transfer(etherAmount);
    }
}
