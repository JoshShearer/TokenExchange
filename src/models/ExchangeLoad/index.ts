import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import type {
  Exchange as ExCon,
  Order,
} from '../../../web3_eth/web3Types/Exchange';
import _ from 'lodash';
import { decorateFilledOrders } from "#src/models/interactions";


type defaultState = {
  Exchange: ExCon;
  exchangeLoaded: boolean;
  cancelledOrders: Array<Order>;
  cancelledLoaded: boolean;
  filledOrders: Array<Order>;
  filledLoaded: boolean;
  allOrders: Array<Order>;
  allLoaded: boolean;
};

export const models_ExchangeLoad = createModel<RootModel>()({
  state: {
    Exchange: {},
    exchangeLoaded: false,
    cancelledOrders: [], //Array<Order>
    cancelledLoaded: false,
    filledOrders: [],
    filledLoaded: false,
    allOrders: [],
    allLoaded: false,
  } as defaultState,
  reducers: {
    loadExchange(state, payload: ExCon) {
      return {
        ...state,
        Exchange: payload,
      };
    },
    exLoaded(state, payload: boolean) {
      return {
        ...state,
        exchangeLoaded: true,
      };
    },
    loadAllOrders(state, payload: Array<Order>) {
      return {
        ...state,
        allOrders: payload,
      };
    },
    setAllLoaded(state, payload: boolean) {
      return {
        ...state,
        allLoaded: payload,
      };
    },
    loadCancelled(state, payload: Array<Order>) {
      return {
        ...state,
        cancelledOrders: payload,
      };
    },
    setCancelled(state, payload: boolean) {
      return {
        ...state,
        cancelledLoaded: payload,
      };
    },
    loadFilledOrders(state, payload: Array<Order>) {
      return {
        ...state,
        filledOrders: payload,
      };
    },
    setFilled(state, payload: boolean) {
      return {
        ...state,
        filledLoaded: payload,
      };
    },
  },
  selectors: (slice, createSelector, dispatch) => ({
    filledOrdersSelector(){
      return createSelector(
        [slice, (rootState) => rootState.models_ExchangeLoad.filledOrders],
        (defaultState, orders) => {
        // console.log("🚀 ~ file: index.ts ~ line 88 ~ filledOrdersSelector ~ orders", orders)
          // Sort orders by date ascending for price comparison
          orders = orders.sort((a,b) => a.timestamp - b.timestamp)
          // Decorate the orders
          orders = decorateFilledOrders(orders)
          // Sort orders by date descending for display
          orders = orders.sort((a,b) => b.timestamp - a.timestamp)
          return orders
        }
      )
    }
  }),
  effects: (dispatch) => ({
    async loadExchangeAsync(payload: ExCon, state) {
      dispatch.models_ExchangeLoad.loadExchange(payload);
      dispatch.models_ExchangeLoad.exLoaded(true);
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
      dispatch.models_ExchangeLoad.loadCancelled(cancelledOrders);
      dispatch.models_ExchangeLoad.setCancelled(true);

      // Fetch filled orders with the "Trade" event stream
      const tradeStream = await exchange.getPastEvents('Trade', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      // Format filled orders
      const filledOrders = tradeStream.map((event) => event.returnValues);
      // Add cancelled orders to the redux store
      dispatch.models_ExchangeLoad.loadFilledOrders(filledOrders);
      dispatch.models_ExchangeLoad.setFilled(true);

      // Load order stream
      const orderStream = await exchange.getPastEvents('Order', {
        fromBlock: 0,
        toBlock: 'latest',
      });
      // Format order stream
      const allOrders = orderStream.map((event) => event.returnValues);
      // Add open orders to the redux store
      dispatch.models_ExchangeLoad.loadAllOrders(allOrders);
      dispatch.models_ExchangeLoad.setAllLoaded(true);
    },
    async subscribeToEventsAsync(exchange: ExCon, state) {
      const anonymous = async (exchange: ExCon) => {
        exchange.events.Cancel({}, (error, event) => {
          dispatch.models_ExchangeLoad.orderCancelled(event.returnValues);
        });

        exchange.events.Trade({}, (error, event) => {
          dispatch.models_ExchangeLoad.orderFilled(event.returnValues);
        });

        exchange.events.Deposit({}, (error, event) => {
          dispatch.models_ExchangeLoad.balancesLoaded();
        });

        exchange.events.Withdraw({}, (error, event) => {
          dispatch.models_ExchangeLoad.balancesLoaded();
        });

        exchange.events.Order({}, (error, event) => {
          dispatch.models_ExchangeLoad.orderMade(event.returnValues);
        });
      };
      await anonymous(exchange);
    },
  }),
});
