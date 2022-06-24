import { createSelector, createStructuredSelector } from '#src/models/utils';
import { selectors_Orders_openOrders } from '../openOrders';
import { selectors_Orders_decorateOrder } from '../decorateOrder';
import type { Order } from 'web3_eth/web3Types/Exchange';
import { ETHER_ADDRESS, GREEN, RED, ether, formatBalance, tokens } from '#web3/helpers'

const selected = createStructuredSelector({
  account: (root) => root.models_WebB.account,
  openOrders: selectors_Orders_openOrders,
});

export const selectors_Orders_myOpenOrders = createSelector(
  selected,
  ({ account, openOrders }) => {
    // Filter orders created by current account
    let orders = openOrders.filter((o) => o.user === account)
    // Decorate orders - add display attributes
    orders = decorateMyOpenOrders(orders)
    // Sort orders by date descending
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    return orders
  }
);

const decorateMyOpenOrders = (orders: Array<Order>, account: String) => {
  return orders.map((order: Order) => {
    order = selectors_Orders_decorateOrder(order);
    order = decorateMyOpenOrder(order, account);
    return order;
  });
};

const decorateMyOpenOrder = (order: Array<Order>, account: String) => {
  let orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === 'buy' ? GREEN : RED,
  };
};