// const { default: Web3 } = require('web3')

// const { TokenClass } = require('typescript')
const Token = artifacts.require('./Token')
const Exchange = artifacts.require('./Exchange')

require('chai')
    .use(require('chai-as-promised'))
    .should()

const token_conv = (n) => {
    return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
    )
}

contract('Exchange', ([deployer, feeAccount, user1, user2]) => {
    let EVM_REVERT = 'VM Exception while processing transaction: revert'
    let ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
    let token
    let exchange
    const feePercent = 10

    beforeEach(async () => {
        token = await Token.new()
        token.transfer(user1, token_conv(100), {from: deployer})
        exchange = await Exchange.new(feeAccount, feePercent)
        
    })

    describe('deployment', () => {
        it('tracks the fee account', async () => {
          const result = await exchange.feeAccount()
          result.should.equal(feeAccount)
        })
     
        it('tracks the fee percent', async () => {
          const result = await exchange.feePercent()
          result.toString().should.equal(feePercent.toString())
        })
       })

    describe('fallback', () => {
    it('reverts when Ether is sent', () => {
        exchange.sendTransaction({ value: 1, from: user1 }).should.be.rejectedWith(EVM_REVERT)
    })
    })
    describe('depositing Ether', () => {
    let result
    let amount
    
    beforeEach(async () => {
        amount = token_conv(1)
        result = await exchange.depositEther({ from: user1, value: amount})
    })
    
    it('tracks the Ether deposit', async () => {
        const balance = await exchange.tokens(ETHER_ADDRESS, user1)
        balance.toString().should.equal(amount.toString())
    })
    
    
    it('emits a Deposit event', () => {
        const log = result.logs[0]
        log.event.should.eq('Deposit')
        const event = log.args
        event.token.should.equal(ETHER_ADDRESS, 'token address is correct')
        event.user.should.equal(user1, 'user address is correct')
        event.amount.toString().should.equal(amount.toString(), 'amount is correct')
        event.balance.toString().should.equal(amount.toString(), 'balance is correct')
    })
    })

    describe('withdrawing Ether', () => {
        let result
        let amount
     
        beforeEach(async () => {
          // Deposit Ether first
          amount = token_conv(1)
          await exchange.depositEther({ from: user1, value: amount })
        })
        describe('success', () => {
          beforeEach(async () => {
            // Withdraw Ether
            result = await exchange.withdrawEther(amount, { from: user1 })
          })
     
          it('withdraws Ether funds', async () => {
            const balance = await exchange.tokens(ETHER_ADDRESS, user1)
            balance.toString().should.equal('0')
          })
     
          it('emits a "Withdraw" event', () => {
            const log = result.logs[0]
            log.event.should.eq('Withdraw')
            const event = log.args
            event.token.should.equal(ETHER_ADDRESS)
            event.user.should.equal(user1)
            event.amount.toString().should.equal(amount.toString())
            event.balance.toString().should.equal('0')
          })
        })
     
        describe('failure', () => {
          it('rejects withdraws for insufficient balances', async () => {
            await exchange.withdrawEther(token_conv(100), { from: user1 }).should.be.rejectedWith(EVM_REVERT)
          })
        })
       })
    describe('depositing tokens', () => {
        let result 
        let amount 

        beforeEach(async () => {
            amount = token_conv(10)
            await token.approve(exchange.address, amount, {from:user1})
            result = await exchange.depositToken(token.address, amount, {from:user1})
        })
        describe('success', () => {
            it('tracks the token deposit', async () => {
                //check exchange token balance
                let balance
                balance = await token.balanceOf(exchange.address)
                balance.toString().should.equal(amount.toString())
                balance = await exchange.tokens(token.address, user1)
                balance.toString().should.equal(amount.toString())
            })
            it('emits a Deposit event', () => {
                const log = result.logs[0]
                log.event.should.eq('Deposit')
                const event = log.args
                event.token.should.equal(token.address, 'token address is correct')
                event.user.should.equal(user1, 'user address is correct')
                event.amount.toString().should.equal(amount.toString(), 'amount is correct')
                event.balance.toString().should.equal(amount.toString(), 'balance is correct')
              })
        })
        describe('failure', () => {
            
            it('rejects Ether deposits', () => {
              exchange.depositToken(ETHER_ADDRESS, token_conv(10), { from: user1 }).should.be.rejectedWith(EVM_REVERT)
            })
       
            it('fails when no tokens are approved', () => {
              // Don't approve any tokens before depositing
              exchange.depositToken(token.address, token_conv(10), { from: user1 }).should.be.rejectedWith(EVM_REVERT)
            })
          })
 
    })
    describe('withdrawing tokens', () => {
        let result 
        let amount  

        beforeEach(async () => {
            amount = token_conv(10)
            await token.approve(exchange.address, amount, {from:user1})
            await exchange.depositToken(token.address, amount, {from:user1})

            result = await exchange.withdrawToken(token.address, amount, {from:user1})
        })
        describe('success', () => {
            it('withdraw token funds', async () => {
                //check exchange token balance
                // let balance
                // balance = await token.balanceOf(exchange.address)
                // balance.toString().should.equal(amount.toString())
                // balance = await exchange.tokens(token.address, user1)
                // balance.toString().should.equal(amount.toString())
                const balance = await exchange.tokens(token.address, user1)
                balance.toString().should.equal('0')
            })
            it('emits a Withdraw event', async () => {
                const log = result.logs[0]
                log.event.should.eq('Withdraw')
                const event = log.args
                event.token.should.equal(token.address)
                event.user.should.equal(user1)
                event.amount.toString().should.equal(amount.toString())
                event.balance.toString().should.equal('0')
              })
        })
        describe('failure', () => {
            it('rejects Ether withdrawls', async () => {
                await exchange.withdrawToken(ETHER_ADDRESS, token_conv(10), {from:user1}).should.be.rejectedWith(EVM_REVERT)
            })
            it('fails for insufficient balances', async () => {
                await exchange.withdrawToken(token.address, token_conv(10), {from:user1}).should.be.rejectedWith(EVM_REVERT)
            })
        })
    })
    describe('checking balances', () => {
        beforeEach(async () => {
         await exchange.depositEther({ from: user1, value: token_conv(1) })
        })
     
        it('returns user balance', async () => {
          const result = await exchange.balanceOf(ETHER_ADDRESS, user1)
          result.toString().should.equal(token_conv(1).toString())
        })
       })
     describe('making orders', () => {
        let result
     
        beforeEach(async () => {
          result = await exchange.makeOrder(token.address, token_conv(1), ETHER_ADDRESS, token_conv(1), { from: user1 })
        })
     
        it('tracks the newly created order', async () => {
          const orderCount = await exchange.orderCount()
          console.log('logs ', JSON.stringify(result.logs[0], null, 2))
          console.log('orderId ', result.logs[0].args.id)
          orderCount.toString().should.equal('1')
          const order = await exchange.orders('1')
          order.id.toString().should.equal('1', 'id is correct')
          order.user.should.equal(user1, 'user is correct')
          order.tokenGet.should.equal(token.address, 'tokenGet is correct')
          order.amountGet.toString().should.equal(token_conv(1).toString(), 'amountGet is correct')
          order.tokenGive.should.equal(ETHER_ADDRESS, 'tokenGive is correct')
          order.amountGive.toString().should.equal(token_conv(1).toString(), 'amountGive is correct')
          order.timestamp.toString().length.should.be.at.least(1, 'timestamp is present')
        })
     
        it('emits an "Order" event', () => {
          const log = result.logs[0]
          log.event.should.eq('Order')
          const event = log.args
          event.id.toString().should.equal('1', 'id is correct')
          event.user.should.equal(user1, 'user is correct')
          event.tokenGet.should.equal(token.address, 'tokenGet is correct')
          event.amountGet.toString().should.equal(token_conv(1).toString(), 'amountGet is correct')
          event.tokenGive.should.equal(ETHER_ADDRESS, 'tokenGive is correct')
          event.amountGive.toString().should.equal(token_conv(1).toString(), 'amountGive is correct')
          event.timestamp.toString().length.should.be.at.least(1, 'timestamp is present')
        })
       })
       describe('order actions', () => {

        beforeEach(async () => {
          // user1 deposits ether only
          await exchange.depositEther({ from: user1, value: token_conv(1) })
          // give tokens to user2
          await token.transfer(user2, token_conv(100), { from: deployer })
          // user2 deposits tokens only
          await token.approve(exchange.address, token_conv(2), { from: user2 })
          await exchange.depositToken(token.address, token_conv(2), { from: user2 })
          // user1 makes an order to buy tokens with Ether
          await exchange.makeOrder(token.address, token_conv(1), ETHER_ADDRESS, token_conv(1), { from: user1 })
        })
    
        describe('filling orders', () => {
          let result
    
          describe('success', () => {
            beforeEach(async () => {
              // user2 fills order
              result = await exchange.fillOrder('1', { from: user2 })
            })
            //user2 should receive 10% less ether
            it('executes the trade & charges fees', async () => {
              let balance
              balance = await exchange.balanceOf(token.address, user1)
              balance.toString().should.equal(token_conv(1).toString(), 'user1 received tokens')
              balance = await exchange.balanceOf(ETHER_ADDRESS, user2)
              balance.toString().should.equal(token_conv(1).toString(), 'user2 received Ether')
              balance = await exchange.balanceOf(ETHER_ADDRESS, user1)
              balance.toString().should.equal('0', 'user1 Ether deducted')
              balance = await exchange.balanceOf(token.address, user2)
              balance.toString().should.equal(token_conv(0.9).toString(), 'user2 tokens deducted with fee applied')
              const feeAccount = await exchange.feeAccount()
              balance = await exchange.balanceOf(token.address, feeAccount)
              balance.toString().should.equal(token_conv(0.1).toString(), 'feeAccount received fee')
            })
    
            it('updates filled orders', async () => {
              const orderFilled = await exchange.orderFilled(1)
              orderFilled.should.equal(true)
            })
    
            it('emits a "Trade" event', () => {
              const log = result.logs[0]
              log.event.should.eq('Trade')
              const event = log.args
              event.id.toString().should.equal('1', 'id is correct')
              event.user.should.equal(user1, 'user is correct')
              event.tokenGet.should.equal(token.address, 'tokenGet is correct')
              event.amountGet.toString().should.equal(token_conv(1).toString(), 'amountGet is correct')
              event.tokenGive.should.equal(ETHER_ADDRESS, 'tokenGive is correct')
              event.amountGive.toString().should.equal(token_conv(1).toString(), 'amountGive is correct')
              event.userFill.should.equal(user2, 'userFill is correct')
              event.timestamp.toString().length.should.be.at.least(1, 'timestamp is present')
            })
          })
          describe('failure', () => {

            it('rejects invalid order ids', () => {
              const invalidOrderId = 99999
              exchange.fillOrder(invalidOrderId, { from: user2 }).should.be.rejectedWith(EVM_REVERT)
            })
    
            it('rejects already-filled orders', () => {
              // Fill the order
              exchange.fillOrder('1', { from: user2 }).should.be.fulfilled
              // Try to fill it again
              exchange.fillOrder('1', { from: user2 }).should.be.rejectedWith(EVM_REVERT)
            })
    
            it('rejects cancelled orders', () => {
              // Cancel the order
              exchange.cancelOrder('1', { from: user1 }).should.be.fulfilled
              // Try to fill the order
              exchange.fillOrder('1', { from: user2 }).should.be.rejectedWith(EVM_REVERT)
            })
          })
        })
        })
})