import { RootState, Actions, dispatch } from '#src/models/store';

//TS Types
import type { Exchange as ExCon, Order } from '../../web3_eth/web3Types/Exchange';
import type { Token as Tokentype } from '../../web3_eth/web3Types/Token';
import { Eth } from 'web3';


import Web3 from 'web3'

import Token from '../../web3_eth/abis/Token.json'
import Exchange from '../../web3_eth/abis/Exchange.json'
import { ETHER_ADDRESS } from '../../web3_eth/test/helpers'

export const web3Loader = async () => {
  if(typeof window.ethereum!=='undefined'){
    const web3 = new Web3(window.ethereum)
    dispatch.models_WebB.loadWeb3Async(web3)
    return web3
  } else {
    window.alert('Please install MetaMask')
    window.location.assign("https://metamask.io/")
  }
}

//Check for metamask before dispatching the token   
export const loadToken = async (web3: Eth, networkId:string) => {
  try {
    const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    dispatch.models_Token.loadTokenAsync(token)
    return token
  } catch (error) {
    console.log('Token Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadExchange = async (web3, networkId ) => {
  try {
    const exchange = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
    dispatch.models_Exchange.loadExchangeAsync(exchange);
    return exchange
  } catch (error) {
    console.log('Exchange Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const subscribeToEvents = async (exchange, dispatch) => {
  exchange.events.Cancel({}, (error, event) => {
    dispatch(orderCancelled(event.returnValues))
  })

  exchange.events.Trade({}, (error, event) => {
    dispatch(orderFilled(event.returnValues))
  })

  exchange.events.Deposit({}, (error, event) => {
    dispatch(balancesLoaded())
  })

  exchange.events.Withdraw({}, (error, event) => {
    dispatch(balancesLoaded())
  })

  exchange.events.Order({}, (error, event) => {
    dispatch(orderMade(event.returnValues))
  })
}

// export const cancelOrder = (dispatch, exchange, order, account) => {
//   exchange.methods.cancelOrder(order.id).send({ from: account })
//   .on('transactionHash', (hash) => {
//      dispatch(orderCancelling())
//   })
//   .on('error', (error) => {
//     console.log(error)
//     window.alert('There was an error!')
//   })
// }

// export const fillOrder = (dispatch, exchange, order, account) => {
//   exchange.methods.fillOrder(order.id).send({ from: account })
//   .on('transactionHash', (hash) => {
//      dispatch(orderFilling())
//   })
//   .on('error', (error) => {
//     console.log(error)
//     window.alert('There was an error!')
//   })
// }

// export const loadBalances = async (dispatch, web3, exchange, token, account) => {
//   if(typeof account !== 'undefined') {
//       // Ether balance in wallet
//       const etherBalance = await web3.eth.getBalance(account)
//       dispatch(etherBalanceLoaded(etherBalance))

//       // Token balance in wallet
//       const tokenBalance = await token.methods.balanceOf(account).call()
//       dispatch(tokenBalanceLoaded(tokenBalance))

//       // Ether balance in exchange
//       const exchangeEtherBalance = await exchange.methods.balanceOf(ETHER_ADDRESS, account).call()
//       dispatch(exchangeEtherBalanceLoaded(exchangeEtherBalance))

//       // Token balance in exchange
//       const exchangeTokenBalance = await exchange.methods.balanceOf(token.options.address, account).call()
//       dispatch(exchangeTokenBalanceLoaded(exchangeTokenBalance))

//       // Trigger all balances loaded
//       dispatch(balancesLoaded())
//     } else {
//       window.alert('Please login with MetaMask')
//     }
// }

// export const depositEther = (dispatch, exchange, web3, amount, account) => {
//   exchange.methods.depositEther().send({ from: account,  value: web3.utils.toWei(amount, 'ether') })
//   .on('transactionHash', (hash) => {
//     dispatch(balancesLoading())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const withdrawEther = (dispatch, exchange, web3, amount, account) => {
//   exchange.methods.withdrawEther(web3.utils.toWei(amount, 'ether')).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(balancesLoading())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const depositToken = (dispatch, exchange, web3, token, amount, account) => {
//   amount = web3.utils.toWei(amount, 'ether')

//   token.methods.approve(exchange.options.address, amount).send({ from: account })
//   .on('transactionHash', (hash) => {
//     exchange.methods.depositToken(token.options.address, amount).send({ from: account })
//     .on('transactionHash', (hash) => {
//       dispatch(balancesLoading())
//     })
//     .on('error',(error) => {
//       console.error(error)
//       window.alert(`There was an error!`)
//     })
//   })
// }

// export const withdrawToken = (dispatch, exchange, web3, token, amount, account) => {
//   exchange.methods.withdrawToken(token.options.address, web3.utils.toWei(amount, 'ether')).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(balancesLoading())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const makeBuyOrder = (dispatch, exchange, token, web3, order, account) => {
//   const tokenGet = token.options.address
//   const amountGet = web3.utils.toWei(order.amount, 'ether')
//   const tokenGive = ETHER_ADDRESS
//   const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')

//   exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(buyOrderMaking())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const makeSellOrder = (dispatch, exchange, token, web3, order, account) => {
//   const tokenGet = ETHER_ADDRESS
//   const amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
//   const tokenGive = token.options.address
//   const amountGive = web3.utils.toWei(order.amount, 'ether')

//   exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(sellOrderMaking())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }