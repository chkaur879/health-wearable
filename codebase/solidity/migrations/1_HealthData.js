const healthData = artifacts.require('HealthData');

module.exports = function(deployer) {
    deployer.deploy(healthData);
}