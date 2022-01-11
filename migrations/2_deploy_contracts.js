const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DeBank = artifacts.require('DeBank')

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    await deployer.deploy(DeBank, rwd.address, tether.address);
    const deBank = await DeBank.deployed();
    
    await rwd.transfer(deBank.address, '100000000000000000000000000' );

    await tether.transfer(accounts[1], '100000000000000000000');
}