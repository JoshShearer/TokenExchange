import { createModel, RematchDispatch } from '@rematch/core';
import { get, groupBy } from 'lodash';
import type { RootModel } from '#src/models/model';
import type {
  Exchange as ExCon,
  Order,
} from '../../../web3_eth/web3Types/Exchange';
import _ from 'lodash';
import { ContractEventEmitter } from '../../../web3_eth/web3Types/types';
import {
  decorateOrder,
  decorateFilledOrders,
  decorateMyFilledOrders,
  decorateMyOpenOrders,
  decorateOrderBookOrders,
  buildGraphData,
} from '#src/models/model_overflow';
import { string } from 'zod';

type defaultState = {
  Exchange: ExCon;
  exchangeLoaded: boolean;
  cancelledOrders: {
    data: Array<Order>;
    loaded: boolean;
  };
  filledOrders: {
    data: Array<Order>;
    loaded: boolean;
  };
  allOrders: {
    data: Array<Order>;
    loaded: boolean;
  };
  //Operations
  // orderCancelling: boolean;
  // orderFilling: boolean;
  // ethBalanceLoaded: boolean;
  // tokBalanceLoaded: boolean;
  // balancesLoading: boolean;
  // etherBalance: String;
  // tokenBalance: String;
  // etherDepositAmount: String;
  // etherWithdrawAmount: String;
  // tokenDepositAmount: String;
  // tokenWithdrawAmount: String;
  buyOrder: {
    price: String;
    amount: String;
    making: String;
  };
  sellOrder: {
    price: String;
    amount: String;
    making: '';
  };
};

// export type decoTrade = ContractEventLog<{
//   ...Order,
//   userFill: string;
//   user: string;
//   tokenPrice: string;
//   tokenPriceClass: string;
//   etherAmount; string;
//   formattedTimestamp: string;
// }>;
// export type decoTrans = ContractEventLog<{
//   ...Order,
//   user: string;
//   orderType: string;
//   tokenPrice: string;
//   orderTypeClass: string;
//   etherAmount; string;
//   formattedTimestamp: string;
// }>;
// export type decoBook = ContractEventLog<{
//   ...Order,
//   user: string;
//   tokenPrice: string;
//   tokenAmount: string;
//   orderType: string;
//   orderTypeClass: string;
//   orderFillAction: string;
//   etherAmount; string;
//   formattedTimestamp: string;
// }>;

export const models_Exchange = createModel<RootModel>()({
  state: {
    Exchange: {},
    exchangeLoaded: false,
    cancelledOrders: {
      data: {},
      loaded: false,
    },
    filledOrders: {
      data: {},
      loaded: false,
    },
    allOrders: {
      data: {},
      loaded: false,
    },
    //Operations
    // orderCancelling: false,
    // orderFilling: false,
    // ethBalanceLoaded: false,
    // tokBalanceLoaded: false,
    // balancesLoading: false,
    // etherBalance: '',
    // tokenBalance: '',
    // exchangeEtherBalance: '',
    // exchangeTokenBalance: '',
    // etherDepositAmount: '',
    // etherWithdrawAmount: '',
    // tokenDepositAmount: '',
    // tokenWithdrawAmount: '',
    buyOrder: {
      price: '',
      amount: '',
      making: '',
    },
    sellOrder: {
      price: '',
      amount: '',
      making: '',
    },
  } as defaultState,
  reducers: {
    //Initial Data Loading from Blockchain
    loadExchange(state, payload: ExCon) {
      return {
        ...state,
        Exchange: payload,
        exchangeLoaded: true,
      };
    },
    exLoaded(state, payload: boolean) {
      return {
        ...state,
        exchangeLoaded: payload,
      };
    },
    loadAllOrders(state, payload: Array<Order>) {
      return {
        ...state,
        allOrders: {
          data: payload,
          loaded: true,
        },
      };
    },
    setAllLoaded(state, payload: boolean) {
      return {
        ...state,
        allOrders: {
          loaded: payload,
        },
      };
    },
    loadCancelled(state, payload: Array<Order>) {
      return {
        ...state,
        cancelledOrders: {
          data: payload,
          loaded: true,
        },
      };
    },
    setCancelled(state, payload: boolean) {
      return {
        ...state,
        cancelledOrders: {
          loaded: payload,
        },
      };
    },
    loadFilledOrders(state, payload: Array<Order>) {
      return {
        ...state,
        filledOrders: {
          data: payload,
          loaded: true,
        },
      };
    },
    setFilled(state, payload: boolean) {
      return {
        ...state,
        filledOrders: {
          loaded: payload,
        },
      };
    },
    //Blockchain events = State updates
    setCancelling(state, payload: boolean) {
      return {
        ...state,
        orderCancelling: payload,
      };
    },
    orderCancelled(state, order: Order) {
      return {
        ...state,
        orderCancelling: false,
        cancelledOrders: {
          ...state.cancelledOrders,
          order,
        },
      };
    },
    setFilling(state, payload: boolean) {
      return {
        orderFilling: payload,
      };
    },
    orderFilled(state, order: Order) {
      const index = state.filledOrders.findIndex(
        (orders) => orders.id === order.id
      );
      if (index === -1) {
        const data = [...state.filledOrders, order];
      } else {
        const data = state.filledOrders;
      }
      return {
        ...state,
        orderFilling: false,
        filledOrders: {
          ...state.filledOrders,
          data,
        },
      };
    },
    BalancesLoading(state, payload: boolean) {
      return {
        ...state,
        balancesLoading: payload,
      };
    },
    exEthBalLoaded(state, payload: boolean) {
      return {
        ...state,
        ethBalanceLoaded: payload,
      };
    },
    exTokenBalLoaded(state, payload: boolean) {
      return {
        ...state,
        tokBalanceLoaded: payload,
      };
    },
    loadEthBalance(state, payload: String) {
      return {
        ...state,
        etherBalance: payload,
      };
    },
    loadTokBalance(state, payload: String) {
      return {
        ...state,
        tokenBalance: payload,
      };
    },
    buyOrderMaking(state, payload) {
      return {
        ...state,
        buyOrder: {
          amount: null,
          price: null,
          making: true,
        },
      };
    },
    sellOrderMaking(state, payload) {
      return {
        ...state,
        sellOrder: {
          amount: null,
          price: null,
          making: true,
        },
      };
    },
    orderMade(state, order: Order) {
      // Prevent duplicate orders
      index = state.allOrders.data.findIndex(
        (order) => order.id === action.order.id
      );

      if (index === -1) {
        data = [...state.allOrders, order];
      } else {
        data = state.allOrders.data;
      }

      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          data,
        },
        buyOrder: {
          ...state.buyOrder,
          making: false,
        },
        sellOrder: {
          ...state.sellOrder,
          making: false,
        },
      };
    },
    etherDepositAmountChanged(state, amount: String) {
      return {
        ...state,
        etherDepositAmount: amount,
      };
    },
    etherWithdrawAmountChanged(state, amount: String) {
      return {
        ...state,
        etherWithdrawtAmount: amount,
      };
    },
    tokenDepositAmountChanged(state, amount: String) {
      return {
        ...state,
        tokenDepositAmount: amount,
      };
    },
    tokenWithdrawAmountChanged(state, amount: String) {
      return {
        ...state,
        tokenWithdrawAmount: amount,
      };
    },
  },
  selectors: (slice, createSelector) => ({
    filledOrdersSelector() {
      return createSelector(
        [slice, (rootState) => rootState.models_Exchange.filledOrders.data],
        (defaultState, orders) => {
          console.log(
            '🚀 ~ file: index.ts ~ line 345 ~ filledOrdersSelector ~ orders',
            orders
          );
          // Sort orders by date ascending for price comparison
          orders = orders.sort((a, b) => a.timestamp - b.timestamp);
          // Decorate the orders
          orders = decorateFilledOrders(orders);
          // Sort orders by date descending for display
          orders = orders.sort((a, b) => b.timestamp - a.timestamp);
          return orders as Array<Order>;
        }
      );
    },
    myFilledOrdersSelector() {
      return createSelector(
        [slice, (rootState) => rootState.models_WebB.account],
        (defaultState, account) => {
          // Sort orders by date ascending for price comparison
          var orders = defaultState.filledOrders.data.filter(
            (o) => o.user === account || o.userFill === account
          );
          // Sort by date ascending
          orders = orders.sort((a, b) => a.timestamp - b.timestamp);
          // Decorate orders - add display attributes
          orders = decorateMyFilledOrders(orders, account);
          return orders as Array<Order>;
        }
      );
    },
    myOpenOrdersSelector() {
      return createSelector(
        [slice, (rootState) => rootState.models_WebB.account],
        (defaultState, account) => {
          // Sort orders by date ascending for price comparison
          var orders = defaultState.filledOrders.data.filter(
            (o) => o.user === account
          );
          // Decorate orders - add display attributes
          orders = decorateMyOpenOrders(orders, account);
          // Sort orders by date descending
          orders = orders.sort((a, b) => b.timestamp - a.timestamp);
          return orders as Array<Order>;
        }
      );
    },
    priceChartSelector() {
      return createSelector(
        [slice, (rootState) => rootState.models_Exchange.filledOrders.data],
        (defaultState, orders) => {
          // Sort orders by date ascending for compare history
          orders = orders.sort((a, b) => a.timestamp - b.timestamp);
          // Decorate orders - add display attributes
          orders = orders.map((o) => decorateOrder(o));
          // Get last 2 order for final price & price change
          let secondLastOrder, lastOrder;
          [secondLastOrder, lastOrder] = orders.slice(
            orders.length - 2,
            orders.length
          );
          // get last order price
          const lastPrice = get(lastOrder, 'tokenPrice', 0);
          // get second last order price
          const secondLastPrice = get(secondLastOrder, 'tokenPrice', 0);

          return {
            lastPrice,
            lastPriceChange: lastPrice >= secondLastPrice ? '+' : '-',
            series: [
              {
                data: buildGraphData(orders),
              },
            ],
          };
        }
      );
    },
    orderBookSelector() {
      return createSelector(
        //This needs to be OpenOrders...not filled
        [slice, (rootState) => rootState.models_Exchange.filledOrders.data],
        (defaultState, orders) => {
          // Decorate orders
          orders = decorateOrderBookOrders(orders);
          // Group orders by "orderType"
          orders = groupBy(orders, 'orderType');
          // Fetch buy orders
          const buyOrders = get(orders, 'buy', []);
          // Sort buy orders by token price
          orders = {
            ...orders,
            buyOrders: buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
          };
          // Fetch sell orders
          const sellOrders = get(orders, 'sell', []);
          // Sort sell orders by token price
          orders = {
            ...orders,
            sellOrders: sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
          };
          return orders;
        }
      );
    },
  }),
  effects: (dispatch) => ({
    async loadExchangeAsync(exchange: ExCon, state) {
      dispatch.models_Exchange.loadExchange(exchange);
    },
    async loadAllOrdersAsync(exchange: ExCon, state) {
      // Fetch cancelled orders with the "Cancel" event stream
      const cancelStream = await exchange.getPastEvents('Cancel', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      // Format cancelled orders
      const cancelledOrders = cancelStream.map((event) => event.returnValues);
      console.log(
        cancelledOrders
      );
      // Add cancelled orders to the redux store
      dispatch.models_Exchange.loadCancelled(cancelledOrders);
      // Fetch filled orders with the "Trade" event stream
      const tradeStream = await exchange.getPastEvents('Trade', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      // Format filled orders
      const filledOrders = tradeStream.map((event) => event.returnValues);
      console.log(
        filledOrders
      );
      // Add cancelled orders to the redux store
      dispatch.models_Exchange.loadFilledOrders(filledOrders);
      // Load order stream
      const orderStream = await exchange.getPastEvents('Order', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      // Format order stream
      const allOrders = orderStream.map((event) => event.returnValues);
      console.log(
        allOrders
      );
      // Add open orders to the redux store
      dispatch.models_Exchange.loadAllOrders(allOrders);
    },
    // async subscribeToEventsAsync( state) {
    //   state.Exchange.events.Cancel({}, (error, event) => {
    //     dispatch.models_Exchange.orderCancelled(event.returnValues));
    //   })

    //   state.Exchange.events.Trade({}, (error, event) => {
    //     dispatch.models_Exchange.orderFilled(event.returnValues));
    //   })

    //   state.Exchange.events.Deposit({}, (error, event) => {
    //     dispatch.models_Exchange.balancesLoaded());
    //   })

    //   state.Exchange.events.Withdraw({}, (error, event) => {
    //     dispatch.models_Exchange.balancesLoaded());
    //   })

    //   state.Exchange.events.Order({}, (error, event) => {
    //     dispatch.models_Exchange.orderMade(event.returnValues));
    //   })
    // },
  }),
});
