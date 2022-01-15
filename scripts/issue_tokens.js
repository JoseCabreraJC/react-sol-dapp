const DeBank =  artifacts.require('deBank')

module.exports = async function issueRewards(callback) {
    let deBank = await DeBank.deployed()
    await deBank.issueTokens()
    console.log('tokens have benn issued ')
    callback()
}