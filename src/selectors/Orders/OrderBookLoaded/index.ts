import { createSelector, createStructuredSelector } from '#src/models/utils';

const selected = createStructuredSelector({
  cancelledLoaded: (root) => root.models_Exchange.cancelledOrders.loaded,
  filledLoaded: (root) => root.models_Exchange.filledOrders.loaded,
  allLoaded: (root) => root.models_Exchange.allOrders.loaded,

});

export const selectors_Orders_OrderBookLoaded = createSelector(
  selected,
  ({ cancelledLoaded, filledLoaded, allLoaded }) => {
    return cancelledLoaded && filledLoaded && allLoaded;
  }
);
