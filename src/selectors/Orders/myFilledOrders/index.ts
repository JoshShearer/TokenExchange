import { createSelector, createStructuredSelector } from '#src/models/utils';
import { selectors_Orders_decorateOrder } from '../decorateOrder';
import { ETHER_ADDRESS, GREEN, RED, ether, formatBalance, tokens } from '#web3/helpers'

const selected = createStructuredSelector({
  orders: (root) => root.models_Exchange.filledOrders.data,
  account: (root) => root.models_WebB.account,
});

export const selectors_Orders_myFilledOrders = createSelector(
  selected,
  ({ orders, account }) => {
    // Find our orders
    orders = orders.filter((o) => o.user === account || o.userFill === account)
    // Sort by date ascending
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = decorateMyFilledOrders(orders, account)
    return orders
  }
);

const decorateMyFilledOrders = (orders, account) => {
  return(
    orders.map((order) => {
      order = selectors_Orders_decorateOrder(order)
      order = decorateMyFilledOrder(order, account)
      return(order)
    })
  )
}

const decorateMyFilledOrder = (order, account) => {
  const myOrder = order.user === account

  let orderType
  if(myOrder) {
    orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'
  } else {
    orderType = order.tokenGive === ETHER_ADDRESS ? 'sell' : 'buy'
  }

  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED),
    orderSign: (orderType === 'buy' ? '+' : '-')
  })
}