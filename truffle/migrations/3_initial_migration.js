const ArticleHistory = artifacts.require("ArticleHistory");

module.exports = function (deployer) {
  deployer.deploy(ArticleHistory);
};
