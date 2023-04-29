const faucet = artifacts.require("faucet");

module.exports = function (deployer) {
  deployer.deploy(faucet);
};
