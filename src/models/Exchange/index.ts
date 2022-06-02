import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import type { Exchange as ExCon, Order } from '../../../web3_eth/web3Types/Exchange';

type defaultState = {
  Exchange: ExCon,
  exchangeLoaded: boolean,
  cancelledOrders: Array<Order>,
  cancelledLoaded: boolean,
  filledOrders: Array<Order>,
  filledLoaded: boolean,
  allOrders: Array<Order>,
  allLoaded: boolean,
};  

export const models_Exchange = createModel<RootModel>()({
  state: {
    Exchange : {},
    exchangeLoaded:false,
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
    loadAllOrders(state, payload: Array<Order>){
      return{
        ...state,
        allOrder: payload,
      };
    },
    setAllLoaded(state, payload: boolean){
      return{
        ...state,
        allLoaded: payload,
      }
    },
    loadCancelled(state, payload: Array<Order>){
      return{
        ...state,
        cancelledOrders: payload,
      };
    },
    setCancelled(state, payload: boolean){
      return{
        ...state,
        cancelledLoaded: payload,
      };
    },
    loadFilledOrders(state, payload: Array<Order>){
      return{
        ...state,
        filledOrders: payload,
      };
    },
    setFilled(state, payload: boolean){
      return{
        ...state,
        filledLoaded: payload,
      };
    },
  },
  // selectors: (slice, createSelector, dispatch) => ({
  //   contractsLoadedSelector(){
  //     return createSelector(
  //       dispatch.models_Token.tokenLoaded,
  //       dispatch.models_Exchange.exchangeLoaded,
  //       (tl, el) => (tl && el)
  //     )
  //   }
  // }),
  effects: (dispatch) => ({
    async loadExchangeAsync(payload: ExCon, state) {
      dispatch.models_Exchange.loadExchange(payload);
      dispatch.models_Exchange.exLoaded(true);
    },
    async loadAllOrdersAsync(exchange: ExCon, state){
      // Fetch cancelled orders with the "Cancel" event stream
      const cancelStream = await exchange.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest' })
      // Format cancelled orders
      const cancelledOrders = cancelStream.map((event) => event.returnValues)
      // Add cancelled orders to the redux store
      dispatch.models_Exchange.loadCancelled(cancelledOrders)
      dispatch.models_Exchange.setCancelled(true)

      // Fetch filled orders with the "Trade" event stream
      const tradeStream = await exchange.getPastEvents('Trade', { fromBlock: 0, toBlock: 'latest' })
      // Format filled orders
      const filledOrders = tradeStream.map((event) => event.returnValues)
      // Add cancelled orders to the redux store
      dispatch.models_Exchange.loadFilledOrders(filledOrders)
      dispatch.models_Exchange.setFilled(true)

      // Load order stream
      const orderStream = await exchange.getPastEvents('Order', { fromBlock: 0,  toBlock: 'latest' })
      // Format order stream
      const allOrders = orderStream.map((event) => event.returnValues)
      // Add open orders to the redux store
      dispatch.models_Exchange.loadAllOrders(allOrders)
      dispatch.models_Exchange.setAllLoaded(true)
    },
    async subscribeToEvents(exchange: ExCon, state){
    //   exchange.events.Cancel({}, (error, event) => {
    //     dispatch.models_Exchange.orderCancelled(event.returnValues)
    //   })
    
    //   exchange.events.Trade({}, (error, event) => {
    //     dispatch.models_Exchange.orderFilled(event.returnValues)
    //   })
    
    //   exchange.events.Deposit({}, (error, event) => {
    //     dispatch.models_Exchange.balancesLoaded()
    //   })
    
    //   exchange.events.Withdraw({}, (error, event) => {
    //     dispatch.models_Exchange.balancesLoaded()
    //   })
    
    //   exchange.events.Order({}, (error, event) => {
    //     dispatch.models_Exchange.orderMade(event.returnValues)
    //   })
    }
  }),
});
