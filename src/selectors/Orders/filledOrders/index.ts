import { createSelector, createStructuredSelector } from '#src/models/utils';
import { ETHER_ADDRESS, GREEN, RED, ether, formatBalance, tokens } from '#web3/helpers'
import { selectors_Orders_decorateOrder } from '#src/selectors/Orders/decorateOrder';
import type { Order } from 'web3_eth/web3Types/Exchange';

const selected = createStructuredSelector({
  filledOrders: (root) => root.models_Exchange.filledOrders.data,
});

export const selectors_Orders_filledOrders = createSelector(
  selected,
  ({ filledOrders }) => {
  console.log("🚀 ~ file: index.ts ~ line 13 ~ filledOrders", filledOrders)
    // Sort orders by date ascending for price comparison
    let orders = filledOrders.sort((a,b) => a.timestamp - b.timestamp)
    console.log("🚀 ~ file: index.ts ~ line 15 ~ orders", orders)
    // Decorate the orders
    orders = decorateFilledOrders(orders)
    // Sort orders by date descending for display
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    console.log("🚀 ~ file: index.ts ~ line 20 ~ orders", orders)
    return orders
  }
);

const decorateFilledOrders = (orders) => {
  // Track previous order to compare history
  let previousOrder = orders[0]
  return(
    orders.map((order) => {
      order = selectors_Orders_decorateOrder(order)
      order = decorateFilledOrder(order, previousOrder)
      previousOrder = order // Update the previous order once it's decorated
      return order
    })
  )
}
const decorateFilledOrder = (order, previousOrder) => {
  return({
    ...order,
    tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, previousOrder)
  })  
}

const tokenPriceClass = (
    tokenPrice: Number,
    orderId: String,
    previousOrder: Order
  ) => {// Show green price if only one order exists
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