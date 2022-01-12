const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DeBank = artifacts.require('DeBank')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DeBank', (accounts)  => {
    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            let tether = await Tether.new()
            const name = await tether.name()
            assert.equal(name, 'Tether mocks coin')
        })
    })
})