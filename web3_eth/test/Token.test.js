// const { default: Web3 } = require('web3')

const Token = artifacts.require('./Token')
require('chai')
    .use(require('chai-as-promised'))
    .should()

const token_conv = (n) => {
    return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
    )
}

contract('Token', ([deployer, receiver, exchange]) => {
    const name = 'MTB Token'
    const symbol = 'MTB'
    const decimals = '18'
    const totalSupply = token_conv(1000000).toString()
    let token

    beforeEach(async () => {
        token = await Token.new()
    })

    describe('deloyment', () => {
        it('tracks the name', async () => {
            //read the token name here
            //token name is "Token Name"
            // token = await Token.new()            
            result = await token.name()
            result.should.equal(name)
        })
        it('tracks the symbol', async () => {
            const result = await token.symbol()
            result.should.equal(symbol)
        })
        it('tracks the decimals', async () => {
            const result = await token.decimals()
            result.toString().should.equal(decimals)
        })
        it('tracks the total supply', async () => {
            const result = await token.totalSupply()
            result.toString().should.equal(totalSupply.toString())
        })
        it('assigns the total supply to the deployer', async () => {
            const result = await token.balanceOf(deployer)
            result.toString().should.equal(totalSupply.toString())
        })
    })

    describe('sending tokens', () => {
        
        let amount 
        let result 

        describe('success', async () => {

            beforeEach(async () => {
                amount = token_conv(100)
                result = await token.transfer(receiver, amount, {from: deployer})
            })

            it('transfers token balances', async () => {
                let balanceOf 
                balanceOf = await token.balanceOf(deployer)
                // console.log('deployer balance before transfer', balanceOf.toString())
                balanceOf = await token.balanceOf(receiver)
                // console.log('receiver balance before transfer', balanceOf.toString())            
            })

            it('emits a Transfer event', async () => {
                const log = result.logs[0]
                // console.log(result.logs)
                log.event.should.eq('Transfer')
                const event = log.args
                event.from.should.equal(deployer, 'from is correct')
                event.to.toString().should.equal(receiver, 'to is correct')
                event.value.toString().should.equal(amount.toString(), 'value is correct')
            })

        })
        describe('failure', async () => {

            let EVM_REVERT = 'VM Exception while processing transaction: revert'

            it('rejects insufficient balances', async () => {
                let invalidAmount
                invalidAmount = token_conv(100000000)
                await token.transfer(receiver, invalidAmount, {from:deployer}).should.be.rejectedWith(EVM_REVERT)
            })

            it('rejects invalid recipients', async () => {
                await token.transfer(0x0, amount, {from:deployer}).should.be.rejected
            })
        })
    })

    describe('approving tokens', () => {
        let results
        let amount

        beforeEach(async () => {
            amount = token_conv(100)
            result = await token.approve(exchange, amount, {from:deployer})
        })

        describe('success', () => {
            it('allocates on allowance for delegated token spending in exchange', async () =>{
                const allowance = await token.allowance(deployer, exchange)
                allowance.toString().should.equal(amount.toString())
            })
            it('emits an Approval event', async () => {
                const log = result.logs[0]
                // console.log(result.logs)
                log.event.should.eq('Approval')
                const event = log.args
                event.owner.should.equal(deployer, 'owner is correct')
                event.spender.toString().should.equal(exchange, 'spender is correct')
                event.value.toString().should.equal(amount.toString(), 'value is correct')
            })
        })

        describe('failure', ()=> {
            it('rejects invalid recipients', async () => {
                await token.transfer(0x0, amount, {from:deployer}).should.be.rejected
            })
        })
    })

    describe('delegated token transfers', () => {
        
        let amount 
        let result 

        beforeEach(async () => {
            amount = token_conv(100)
            await token.approve(exchange, amount, {from: deployer})
        })

        describe('success', async () => {

            

            beforeEach(async () => {
                amount = token_conv(100)
                result = await token.transferFrom(deployer, receiver, amount, {from: exchange})
            })

            it('transfers token balances', async () => {
                let balanceOf 
                balanceOf = await token.balanceOf(deployer)
                balanceOf.toString().should.equal(token_conv(999900).toString())
                // console.log('deployer balance before transfer', balanceOf.toString())
                balanceOf = await token.balanceOf(receiver)
                balanceOf.toString().should.equal(token_conv(100).toString())
                // console.log('receiver balance before transfer', balanceOf.toString())            
            })

            it('resets the allowance', async () =>{
                const allowance = await token.allowance(deployer, exchange)
                allowance.toString().should.equal('0')
            })

            it('emits a Transfer event', async () => {
                const log = result.logs[0]
                // console.log(result.logs)
                log.event.should.eq('Transfer')
                const event = log.args
                event.from.toString().should.equal(deployer, 'from is correct')
                event.to.should.equal(receiver, 'to is correct')
                event.value.toString().should.equal(amount.toString(), 'value is correct')
            })

        })
        describe('failure', async () => {

            let EVM_REVERT = 'VM Exception while processing transaction: revert'

            it('rejects insufficient balances', async () => {
                let invalidAmount
                invalidAmount = token_conv(100000000)
                await token.transferFrom(deployer, receiver, invalidAmount, {from:exchange}).should.be.rejectedWith(EVM_REVERT)
            })

            it('rejects invalid recipients', async () => {
                await token.transfer(0x0, amount, {from:deployer}).should.be.rejected
            })
        })
    })
})