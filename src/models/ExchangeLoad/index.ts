import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import type {
  Exchange as ExCon,
  Order,
} from '../../../web3_eth/web3Types/Exchange';
import _ from 'lodash';
import { decorateFilledOrders } from "#src/models/model_overflow";


type defaultState = {
  Exchange: ExCon;
  exchangeLoaded: boolean;
  cancelledOrders: Array<Order>;
  cancelledLoaded: boolean;
  filledOrders: Array<Order>;
  filledLoaded: boolean;
  allOrders: Array<Order>;
  allLoaded: boolean;
  //Operations
  orderCancelling: boolean;
  orderFilling: boolean;
  balancesLoading:boolean;
  etherBalance: String;
  tokenBalance: String;
  etherDepositAmount: String;
  etherWithdrawAmount: String;
  tokenDepositAmount: String;
  tokenWithdrawAmount: String;
  buyOrder: Order;
  sellOrder: Order;
};

export const models_ExchangeLoad = createModel<RootModel>()({
  state: {
    Exchange: {},
    exchangeLoaded: false,
    cancelledOrders: [], 
    cancelledLoaded: false,
    filledOrders: [],
    filledLoaded: false,
    allOrders: [],
    allLoaded: false,
    //Operations
    orderCancelling:false,
    orderFilling: false,
    balancesLoading: false,
    etherBalance: "",
    tokenBalance: "",
    etherDepositAmount: "",
    etherWithdrawAmount: "",
    tokenDepositAmount: "",
    tokenWithdrawAmount: "",
    buyOrder: {},
    sellOrder: {}
    
  } as defaultState,
  reducers: {
    //Initial Data Loading from Blockchain
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
          order
        }
      };
    },
    setFilling(state, payload: boolean) {
      return {
        orderFilling: payload
      }
    },
    orderFilled(state, order: Order) {
      const index = state.filledOrders.findIndex(orders => orders.id === order.id);
      if(index === -1) {
        const data = [...state.filledOrders, order]
      } else {
        const data = state.filledOrders
      }
      return {
        ...state,
        orderFilling: false,
        filledOrders: {
          ...state.filledOrders,
          data
        }
      }
    },
    BalancesLoading(state, payload: boolean) {
      return {
        ...state,
        balancesLoading: payload
      }
    },
    exEthBalLoaded(state) {
      return {

      }
    },
    exTokenBalLoaded(state) {
      return {

      }
    },
    orderMade(state, order: Order) {
       // Prevent duplicate orders
       index = state.allOrders.data.findIndex(order => order.id === action.order.id);

       if(index === -1) {
         data = [...state.allOrders, order]
       } else {
         data = state.allOrders.data
       }
 
       return {
         ...state,
         allOrders: {
           ...state.allOrders,
           data
         },
         buyOrder: {
           ...state.buyOrder,
           making: false
         },
         sellOrder: {
           ...state.sellOrder,
           making: false
         }
       }
    }
  },
  selectors: (slice, createSelector) => ({
    // exchangeSelector(){

    // },
    // filledOrdersLoadedSelector(){
    //   // return createSelector
    // },
    filledOrdersSelector(){
      return createSelector(
        [slice, (rootState) => rootState.models_ExchangeLoad.filledOrders],
        (defaultState, orders) => {
          // Sort orders by date ascending for price comparison
          orders = orders.sort((a,b) => a.timestamp - b.timestamp)
          // Decorate the orders
          orders = decorateFilledOrders(orders)
          // Sort orders by date descending for display
          orders = orders.sort((a,b) => b.timestamp - a.timestamp)
          return orders as Array<Order>
        }
      )
    }
  }),
  effects: (dispatch) => ({
    async loadExchangeAsync(exchange: ExCon, state) {
      dispatch.models_ExchangeLoad.loadExchange(exchange);
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
    // async subscribeToEventsAsync( state) {
    //   state.Exchange.events.Cancel({}, (error, event) => {
    //     dispatch.models_ExchangeLoad.orderCancelled(event.returnValues));
    //   })
    
    //   state.Exchange.events.Trade({}, (error, event) => {
    //     dispatch.models_ExchangeLoad.orderFilled(event.returnValues));
    //   })
    
    //   state.Exchange.events.Deposit({}, (error, event) => {
    //     dispatch.models_ExchangeLoad.balancesLoaded());
    //   })
    
    //   state.Exchange.events.Withdraw({}, (error, event) => {
    //     dispatch.models_ExchangeLoad.balancesLoaded());
    //   })
    
    //   state.Exchange.events.Order({}, (error, event) => {
    //     dispatch.models_ExchangeLoad.orderMade(event.returnValues));
    //   })
    // },
  }),
});
