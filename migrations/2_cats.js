var Cats = artifacts.require("./Cats.sol");

module.exports = function(deployer) {
  deployer.deploy(Cats);
};
