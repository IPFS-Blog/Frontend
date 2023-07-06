// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract ArticleRegistry {
    struct Article {
        string hashCode;
        string creationTime;
    }

    mapping(uint256 => Article[]) private articles;

     constructor() payable {
        // 構造函數，可以接收初始資金
    }

    function addArticle(uint256 _id, string memory _hashCode, string memory _creationTime) external {
        Article memory newArticle = Article(_hashCode, _creationTime);
        articles[_id].push(newArticle);
    }

    function getArticle(uint256 _id) external view returns (Article[] memory) {
        return articles[_id];
    }

    receive() external payable {
        // 這個合約只允許從外部帳戶接收資金
    }
}
