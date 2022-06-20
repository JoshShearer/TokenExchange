import { createModel, RematchDispatch } from '@rematch/core';
import { defaults, get, groupBy, reject } from 'lodash';
import type { RootModel } from '#src/models/model';
import type {
  Exchange as ExCon,
  Order,
} from '../../../web3_eth/web3Types/Exchange';
import _ from 'lodash';
import { ContractEventEmitter } from '../../../web3_eth/web3Types/types';
// import {
//   openOrders,
//   decorateOrder,
//   decorateFilledOrders,
//   decorateMyFilledOrders,
//   decorateMyOpenOrders,
//   decorateOrderBookOrders,
//   buildGraphData,
// } from '#src/models/model_overflow';
import { string } from 'zod';
import mod from 'zod/lib';

type defaultState = {
  Exchange: {
    data: ExCon;
    loaded: boolean;
  };
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
  Balances: {
    loading: boolean;
    ether: {
      loading: boolean;
      Balance: string;
    };
    token: {
      loading: boolean;
      Balance: string;
    };
  };
  Debits: {
    Deposit: {
      etherAmount: string;
      tokenAmount: string;
    };
    Withdraw: {
      tokenAmount: string;
      etherAmount: string;
    };
  };
  Orders: {
    cancelling: boolean;
    filling: boolean;
    buyOrder: {
      price: string;
      amount: string;
      making: boolean;
    };
    sellOrder: {
      price: string;
      amount: string;
      making: boolean;
    };
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
    Exchange: {
      data: {},
      loaded: false,
    },
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
    Balances: {
      loading: false,
      ether: {
        loaded: false,
        Balance: '',
      },
      token: {
        loaded: false,
        Balance: '',
      },
    },
    Debits: {
      Deposit: {
        etherAmount: '',
        tokenAmount: '',
      },
      Withdraw: {
        tokenAmount: '',
        etherAmount: '',
      },
    },
    Orders: {
      cancelling: false,
      filling: false,
      buyOrder: {
        price: '',
        amount: '',
        making: false,
      },
      sellOrder: {
        price: '',
        amount: '',
        making: false,
      },
    },
  } as defaultState,
  reducers: {
    //Initial Data Loading from Blockchain
    loadExchange(state, payload: ExCon) {
      return {
        ...state,
        Exchange: {
          data: payload,
          loaded: true,
        },
      };
    },
    exLoaded(state, payload: boolean) {
      return {
        ...state,
        Exchange: {
          ...state.Exchange,
          loaded: payload,
        },
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
          ...state.allOrders,
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
          ...state.cancelledOrders,
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
          ...state.filledOrders,
          loaded: payload,
        },
      };
    },

    //Blockchain events = State updates
    setCancelling(state, payload: boolean) {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          cancelling: payload,
        },
      };
    },
    orderCancelled(state, order: Order) {
      return {
        ...state,
        Order: {
          ...state.Orders,
          cancelling: false,
        },
        cancelledOrders: {
          ...state.cancelledOrders.data,
          order,
        },
      };
    },
    setFilling(state, payload: boolean) {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          filling: payload,
        },
      };
    },
    orderFilled(state, order: Order) {
      console.log("🚀 ~ file: index.ts ~ line 269 ~ orderFilled ~ order", order)
      const index = state.filledOrders.data.findIndex(
        (orderS) => orderS.id === order.id
      );
      console.log("🚀 ~ file: index.ts ~ line 273 ~ orderFilled ~ index", index)
      let data;
      if (index === -1) {
        data = [...state.filledOrders.data, order];
      } else {
        data = state.filledOrders.data;
      }
      
      console.log("🚀 ~ file: index.ts ~ line 277 ~ orderFilled ~ data", data)
      return {
        ...state,
        Orders: {
          ...state.Orders,
          filling: false,
        },
        filledOrders: {
          loaded: true,
          data: {
            ...state.filledOrders.data,
            data,
          },
        },
      };
    },
    balancesLoaded(state, payload: boolean) {
      return {
        ...state,
        Balances: {
          ...state.Balances,
          loading: false,
        },
      };
    },
    balancesLoading(state, payload: boolean) {
      return {
        ...state,
        Balances: {
          ...state.Balances,
          loading: true,
        },
      };
    },
    loadExEthBal(state, payload: String) {
      return {
        ...state,
        Balances: {
          ...state.Balances,
          ether: {
            loaded: true,
            Balance: payload,
          },
        },
      };
    },
    loadExTokBal(state, payload: String) {
      return {
        ...state,
        Balances: {
          ...state.Balances,
          token: {
            loaded: true,
            Balance: payload,
          },
        },
      };
    },
    buyOrderAmountChanged(state, payload: String) {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          buyOrder: {
            ...state.Orders.buyOrder,
            amount: payload,
          },
        },
      };
    },
    buyOrderPriceChanged(state, payload: String) {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          buyOrder: {
            ...state.Orders.buyOrder,
            price: payload,
          },
        },
      };
    },
    sellOrderAmountChanged(state, payload: String) {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          sellOrder: {
            ...state.Orders.sellOrder,
            amount: payload,
          },
        },
      };
    },
    sellOrderPriceChanged(state, payload: String) {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          sellOrder: {
            ...state.Orders.sellOrder,
            price: payload,
          },
        },
      };
    },
    buyOrderMaking(state, payload: String) {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          buyOrder: {
            amount: null,
            price: null,
            making: true,
          },
        },
      };
    },
    sellOrderMaking(state, payload: String) {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          sellOrder: {
            amount: null,
            price: null,
            making: true,
          },
        },
      };
    },
    orderMade(state, order: Order) {
      // Prevent duplicate orders
      const index = state.allOrders.data.findIndex(
        (orderS) => orderS.id === order.id //Needs updating with rematch?
      );
      let data;
      if (index === -1) {
        data = [...state.allOrders.data, order];
      } else {
        data = state.allOrders.data;
      }

      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          data,
        },
        Orders: {
          cancelling: false,
          filling: false,
          buyOrder: {
            ...state.Orders.buyOrder,
            making: false,
          },
          sellOrder: {
            ...state.Orders.sellOrder,
            making: false,
          },
        },
      };
    },
    etherDepositAmountChanged(state, amount: String) {
      return {
        ...state,
        Debits: {
          ...state.Debits,
          Deposit: {
            ...state.Debits.Deposit,
            etherAmount: amount,
          },
        },
      };
    },
    etherWithdrawAmountChanged(state, amount: String) {
      return {
        ...state,
        Debits: {
          ...state.Debits,
          Withdraw: {
            ...state.Debits.Withdraw,
            etherAmount: amount,
          },
        },
      };
    },
    tokenDepositAmountChanged(state, amount: String) {
      return {
        ...state,
        Debits: {
          ...state.Debits,
          Deposit: {
            ...state.Debits.Deposit,
            tokenAmount: amount,
          },
        },
      };
    },
    tokenWithdrawAmountChanged(state, amount: String) {
      return {
        ...state,
        Debits: {
          ...state.Debits.Deposit,
          Withdraw: {
            ...state.Debits.Withdraw,
            tokenAmount: amount,
          },
        },
      };
    },
  },
  // selectors: (slice, createSelector) => ({
  //   filledOrdersSelector() {
  //     return createSelector(
  //       [slice, (rootState) => rootState.models_Exchange.filledOrders.data],
  //       (defaultState, orders) => {
  //         // Sort orders by date ascending for price comparison
  //         orders = orders.sort((a, b) => a.timestamp - b.timestamp);
  //         // Decorate the orders
  //         orders = decorateFilledOrders(orders);
  //         // Sort orders by date descending for display
  //         orders = orders.sort((a, b) => b.timestamp - a.timestamp);
  //         return orders as Array<Order>;
  //       }
  //     );
  //   },
  //   myFilledOrdersSelector() {
  //     return createSelector(
  //       [slice, (rootState) => rootState.models_WebB.account],
  //       (defaultState, account) => {
  //         // Sort orders by date ascending for price comparison
  //         var orders = defaultState.filledOrders.data.filter(
  //           (o) => o.user === account || o.userFill === account
  //         );
  //         // Sort by date ascending
  //         orders = orders.sort((a, b) => a.timestamp - b.timestamp);
  //         // Decorate orders - add display attributes
  //         orders = decorateMyFilledOrders(orders, account);

  //         return orders as Array<Order>;
  //       }
  //     );
  //   },
  //   myOpenOrdersSelector() {
  //     return createSelector(
  //       [slice, (rootState) => rootState.models_WebB.account],
  //       (defaultState, account) => {
  //         const oOrders = openOrders(
  //           defaultState.allOrders.data,
  //           defaultState.filledOrders.data,
  //           defaultState.cancelledOrders.data
  //         );

  //         // Sort orders by date ascending for price comparison
  //         var orders = oOrders.filter((o) => o.user === account);
  //         // Decorate orders - add display attributes
  //         orders = decorateMyOpenOrders(orders, account);
  //         // Sort orders by date descending
  //         orders = orders.sort((a, b) => b.timestamp - a.timestamp);

  //         return orders as Array<Order>;
  //       }
  //     );
  //   },
  //   priceChartSelector() {
  //     return createSelector(
  //       [slice, (rootState) => rootState.models_Exchange.filledOrders.data],
  //       (defaultState, orders) => {
  //         // Sort orders by date ascending for compare history
  //         orders = orders.sort((a, b) => a.timestamp - b.timestamp);
  //         // Decorate orders - add display attributes
  //         orders = orders.map((o) => decorateOrder(o));
  //         // Get last 2 order for final price & price change
  //         let secondLastOrder, lastOrder;
  //         [secondLastOrder, lastOrder] = orders.slice(
  //           orders.length - 2,
  //           orders.length
  //         );
  //         // get last order price
  //         const lastPrice = get(lastOrder, 'tokenPrice', 0);
  //         // get second last order price
  //         const secondLastPrice = get(secondLastOrder, 'tokenPrice', 0);

  //         return {
  //           lastPrice,
  //           lastPriceChange: lastPrice >= secondLastPrice ? '+' : '-',
  //           series: [
  //             {
  //               data: buildGraphData(orders),
  //             },
  //           ],
  //         };
  //       }
  //     );
  //   },
  //   orderBookSelector() {
  //     return createSelector(
  //       //This needs to be OpenOrders...not filled
  //       [slice, (rootState) => rootState.models_Exchange.filledOrders.data],
  //       (defaultState, orders) => {
  //         const oOrders = openOrders(
  //           defaultState.allOrders.data,
  //           defaultState.filledOrders.data,
  //           defaultState.cancelledOrders.data
  //         );
  //         // Decorate orders
  //         orders = decorateOrderBookOrders(oOrders);
  //         // Group orders by "orderType"
  //         orders = groupBy(orders, 'orderType');
  //         // Fetch buy orders
  //         const buyOrders = get(orders, 'buy', []);
  //         // Sort buy orders by token price
  //         orders = {
  //           ...orders,
  //           buyOrders: buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
  //         };
  //         // Fetch sell orders
  //         const sellOrders = get(orders, 'sell', []);
  //         // Sort sell orders by token price
  //         orders = {
  //           ...orders,
  //           sellOrders: sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
  //         };

  //         return orders;
  //       }
  //     );
  //   },
  // }),
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
      // Add cancelled orders to the redux store
      dispatch.models_Exchange.loadCancelled(cancelledOrders);
      // Fetch filled orders with the "Trade" event stream
      const tradeStream = await exchange.getPastEvents('Trade', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      // Format filled orders
      const filledOrders = tradeStream.map((event) => event.returnValues);
      // Add cancelled orders to the redux store
      dispatch.models_Exchange.loadFilledOrders(filledOrders);
      // Load order stream
      const orderStream = await exchange.getPastEvents('Order', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      // Format order stream
      const allOrders = orderStream.map((event) => event.returnValues);
      // Add open orders to the redux store
      dispatch.models_Exchange.loadAllOrders(allOrders);
    },
  }),
});
