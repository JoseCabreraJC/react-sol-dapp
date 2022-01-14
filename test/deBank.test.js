const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DeBank = artifacts.require('DeBank')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DeBank', ([owner, customer])  => {
    let tether, rwd, deBank;

    function tokens(number){
        return web3.utils.toWei(number, 'ether')
    }

    before( async () => {
        tether = await Tether.new()
        rwd = await RWD.new()
        deBank = await DeBank.new(rwd.address, tether.address)

        await rwd.transfer(deBank.address, tokens('1000000') )
        await tether.transfer(customer, tokens('1000'), {from: owner})
    })

    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name()
            assert.equal(name, 'Tether mocks coin')
        })
    })
    describe('RWD token Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward token')
        })
    })
    describe('DeBank Token Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await deBank.name()
            assert.equal(name, 'Decentralized Bank')
        })
        
        it('has tokens', async () => {
            let balance = await rwd.balanceOf(deBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })
})