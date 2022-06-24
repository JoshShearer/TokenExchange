import { createSelector, createStructuredSelector } from '#src/models/utils';
import { selectors_Orders_openOrders } from '../openOrders';
import { selectors_Orders_decorateOrder } from '../decorateOrder';
import { ETHER_ADDRESS, GREEN, RED, ether, formatBalance, tokens } from '#web3/helpers'

import { groupBy, get } from 'lodash';

const selected = createStructuredSelector({
  openOrders: selectors_Orders_openOrders,
});

export const selectors_Orders_OrderBook = createSelector(
  selected,
  ({ openOrders }) => {
  // Decorate orders
  let orders = decorateOrderBookOrders(openOrders)
  // Group orders by "orderType"
  orders = groupBy(orders, 'orderType')
  // Fetch buy orders
  const buyOrders = get(orders, 'buy', [])
  // Sort buy orders by token price
  orders = {
    ...orders,
    buyOrders: buyOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
  }
  // Fetch sell orders
  const sellOrders = get(orders, 'sell', [])
  // Sort sell orders by token price
  orders = {
    ...orders,
    sellOrders: sellOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
  }
  return orders
  }
);

const decorateOrderBookOrders = (orders) => {
  return(
    orders.map((order) => {
      order = selectors_Orders_decorateOrder(order)
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