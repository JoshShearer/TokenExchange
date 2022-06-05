import { RootState, Actions, dispatch } from '#src/models/store';
import { ETHER_ADDRESS, GREEN, RED, ether, formatBalance, tokens } from '../../web3_eth/test/helpers'

//TS Types
import type { Exchange as ExCon, Order } from '../../web3_eth/web3Types/Exchange';
import type { Token as Tokentype } from '../../web3_eth/web3Types/Token';
import { Eth } from 'web3';

import Token from '../../web3_eth/abis/Token.json'
import Exchange from '../../web3_eth/abis/Exchange.json'


import Web3 from 'web3'
import moment from 'moment'


export const web3Loader = async () => {
  if(typeof window.ethereum!=='undefined'){
    const web3 = new Web3(window.ethereum)
    // console.log("🚀 ~ file: model_overflow.ts ~ line 20 ~ web3Loader ~ web3", web3)
    dispatch.models_WebB.loadWeb3Async(web3)
    return web3
  } else {
    window.alert('Please install MetaMask')
    window.location.assign("https://metamask.io/")
  }
}

//Check for metamask before dispatching the token   
export const loadToken = async (web3: Eth, networkId: Number) => {
  try {
    const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    dispatch.models_Token.loadTokenAsync(token)
    return token
  } catch (error) {
    console.log('Token Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadExchange = async (web3: Eth, networkId: Number ) => {
  try {
    const exchange = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
    dispatch.models_ExchangeLoad.loadExchangeAsync(exchange);
    return exchange
  } catch (error) {
    console.log('Exchange Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const subscribeToEvents = async (exchange: ExCon) => {
  exchange.events.Cancel({}, (error, event) => {
    dispatch.models_ExchangeLoad.orderCancelled(event.returnValues)
  })

  exchange.events.Trade({}, (error, event) => {
    dispatch.models_ExchangeLoad.orderFilled(event.returnValues)
  })

  exchange.events.Deposit({}, (error, event) => {
    dispatch.models_ExchangeLoad.balancesLoading(false)
  })

  exchange.events.Withdraw({}, (error, event) => {
    dispatch.models_ExchangeLoad.balancesLoading(false)
  })

  exchange.events.Order({}, (error, event) => {
    dispatch.models_ExchangeLoad.orderMade(event.returnValues)
  })
}

export const cancelOrder = (exchange, order, account) => {
  exchange.methods.cancelOrder(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch.models_ExchangeLoad.orderCancelling()
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
}

export const fillOrder = (dispatch, exchange, order, account) => {
  exchange.methods.fillOrder(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch.models_ExchangeLoad.orderFilling()
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
}

export const loadBalances = async (dispatch, web3, exchange, token, account) => {
  if(typeof account !== 'undefined') {
      // Ether balance in wallet
      const etherBalance = await web3.eth.getBalance(account)
      dispatch.models_ExchangeLoad.etherBalanceLoaded(etherBalance)

      // Token balance in wallet
      const tokenBalance = await token.methods.balanceOf(account).call()
      dispatch.models_ExchangeLoad.tokenBalanceLoaded(tokenBalance)

      // Ether balance in exchange
      const exchangeEtherBalance = await exchange.methods.balanceOf(ETHER_ADDRESS, account).call()
      dispatch.models_ExchangeLoad.exchangeEtherBalanceLoaded(exchangeEtherBalance)

      // Token balance in exchange
      const exchangeTokenBalance = await exchange.methods.balanceOf(token.options.address, account).call()
      dispatch.models_ExchangeLoad.exchangeTokenBalanceLoaded(exchangeTokenBalance)

      // Trigger all balances loaded
      dispatch.models_ExchangeLoad.balancesLoaded()
    } else {
      window.alert('Please login with MetaMask')
    }
}

export const depositEther = (dispatch, exchange, web3, amount, account) => {
  exchange.methods.depositEther().send({ from: account,  value: web3.utils.toWei(amount, 'ether') })
  .on('transactionHash', (hash) => {
    dispatch.models_ExchangeLoad.balancesLoading()
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

export const withdrawEther = (dispatch, exchange, web3, amount, account) => {
  exchange.methods.withdrawEther(web3.utils.toWei(amount, 'ether')).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch.models_ExchangeLoad.balancesLoading()
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

export const depositToken = (dispatch, exchange, web3, token, amount, account) => {
  amount = web3.utils.toWei(amount, 'ether')

  token.methods.approve(exchange.options.address, amount).send({ from: account })
  .on('transactionHash', (hash) => {
    exchange.methods.depositToken(token.options.address, amount).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch.models_ExchangeLoad.balancesLoading()
    })
    .on('error',(error) => {
      console.error(error)
      window.alert(`There was an error!`)
    })
  })
}

export const withdrawToken = (dispatch, exchange, web3, token, amount, account) => {
  exchange.methods.withdrawToken(token.options.address, web3.utils.toWei(amount, 'ether')).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch.models_ExchangeLoad.balancesLoading()
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

export const makeBuyOrder = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = token.options.address
  const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGive = ETHER_ADDRESS
  const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')

  exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch.models_ExchangeLoad.buyOrderMaking()
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

export const makeSellOrder = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = ETHER_ADDRESS
  const amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
  const tokenGive = token.options.address
  const amountGive = web3.utils.toWei(order.amount, 'ether')

  exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch.models_ExchangeLoad.sellOrderMaking()
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

//Prepare various orders for component displays
export const decorateFilledOrders = (orders: Array<Order>) => {
  // Track previous order to compare history
  let previousOrder = orders[0]
  return(
    orders.map((order) => {
      order = decorateOrder(order)
      order = decorateFilledOrder(order, previousOrder)
      previousOrder = order // Update the previous order once it's decorated
      return order
    })
  )
}

const decorateOrder = (order: Order) => {
  let etherAmount
  let tokenAmount

  if(order.tokenGive === ETHER_ADDRESS) {
    etherAmount = order.amountGive
    tokenAmount = order.amountGet
  } else {
    etherAmount = order.amountGet
    tokenAmount = order.amountGive
  }

  // Calculate token price to 5 decimal places
  const precision = 100000
  let tokenPrice = (etherAmount / tokenAmount)
  tokenPrice = Math.round(tokenPrice * precision) / precision

  return({
    ...order,
    etherAmount: ether(etherAmount),
    tokenAmount: tokens(tokenAmount),
    tokenPrice,
    formattedTimestamp: moment.unix(order.timestamp).format('h:mm:ss a M/D')
  })
}

const decorateFilledOrder = (order: Order, previousOrder: Order) => {
  return({
    ...order,
    tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, previousOrder)
  })  
}
const tokenPriceClass = (tokenPrice: Number, orderId: String, previousOrder: Order) => {
  // Show green price if only one order exists
  if(previousOrder.id === orderId) {
    return GREEN
  }

  // Show green price if order price higher than previous order
  // Show red price if order price lower than previous order
  if(previousOrder.tokenPrice <= tokenPrice) {
    return GREEN // success
  } else {
    return RED // danger
  }
}

const decorateMyOpenOrders = (orders, account) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order)
      order = decorateMyOpenOrder(order, account)
      return(order)
    })
  )
}
                                        
const decorateMyOpenOrder = (order, account) => {
  let orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'

  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED)
  })
}

const decorateOrderBookOrders = (orders) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order)
      order = decorateOrderBookOrder(order)
      return(order)
    })
  )
}

const decorateOrderBookOrder = (order) => {
  const orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'
  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED),
    orderFillAction: orderType === 'buy' ? 'sell' : 'buy'
  })
}