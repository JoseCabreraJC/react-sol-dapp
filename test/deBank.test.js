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

    describe('Yield farming', async () => {
        it('rewards tokens for staking', async () => {
            let result
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('1000'), 'investor mock tether balance before Staking')
            
            await tether.approve(deBank.address ,tokens('1000'), {from: customer});
            await deBank.depositToken(tokens('1000'), {from: customer});

            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'investor mock tether balance after Staking')

            result = await tether.balanceOf(deBank.address)
            assert.equal(result.toString(), tokens('1000'), 'debank mock tether balance after Staking')

            result = await deBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer is Staking')

            await deBank.issueTokens({from: owner})

            await deBank.issueTokens({from: customer}).should.be.rejected;

            // unstake tokens
            await deBank.unstakeTokens({from: customer})

            // check balances
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('1000'), 'investor mock tether balance after unstaking')

            result = await tether.balanceOf(deBank.address)
            assert.equal(result.toString(), tokens('0'), 'debank mock tether balance after unstaking')

            result = await deBank.isStaking(customer)
            assert.equal(result.toString(), 'false', 'customer is no longer Staking')



        })

    })
})