const ResidentRegistration = artifacts.require("./ResidentRegistration.sol");

module.exports = function (deployer) {
  deployer.deploy(ResidentRegistration);
};