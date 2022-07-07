import { ETHER_ADDRESS, ether, tokens } from '#web3/test/helpers'
import type { Order } from 'web3_eth/web3Types/Exchange';
import moment from 'moment'
import { ContractEventLog } from '#web3/web3Types/types';
import { TypeOf } from 'zod';

export const selectors_Orders_decorateOrder = (order: Order) => {
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