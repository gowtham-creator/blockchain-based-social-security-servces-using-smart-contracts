const SocialSecurity = artifacts.require("SocialSecurity");

module.exports = function(deployer) {
  deployer.deploy(SocialSecurity);
};
