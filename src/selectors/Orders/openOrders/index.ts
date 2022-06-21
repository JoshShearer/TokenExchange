import { createSelector, createStructuredSelector } from '#src/models/utils';
import { reject } from 'lodash';

const selected = createStructuredSelector({
  all: (root) => root.models_Exchange.allOrders.data,
  filled: (root) => root.models_Exchange.filledOrders.data,
  cancelled: (root) => root.models_Exchange.cancelledOrders.data,
});

export const selectors_Orders_openOrders = createSelector(
  selected,
  ({ all, filled, cancelled }) => {
    const openOrders = reject(all, (order) => {
      const orderFilled = filled.some((o) => o.id === order.id)
      const orderCancelled = cancelled.some((o) => o.id === order.id)
      return(orderFilled || orderCancelled)
    })
  
    return openOrders
  }
);
