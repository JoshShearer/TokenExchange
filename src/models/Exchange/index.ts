import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import type { Contract } from 'web3-eth-contract';
import { loadAllOrders } from '#src/models/interactions';
// import type { Contract}

type defaultState = {
  Exchange: Contract,
  contractsLoaded: boolean,
  cancelledOrders: any,
  cancelledLoaded: boolean,
  filledOrders: any,
  filledLoaded: boolean,
  allOrders: any,
  allLoaded: boolean,
};  

export const models_Exchange = createModel<RootModel>()({
  state: {
    Exchange : {},
    contractsLoaded: false,
    cancelledOrders: [],
    cancelledLoaded: false,
    filledOrders: [],
    filledLoaded: false,
    allOrders: [],
    allLoaded: false,
  } as defaultState,
  reducers: {
    loadExchange(state, payload: Contract) {
      return {
        ...state,
        Exchange: payload,
      };
    },
    loadAllOrders(state, payload: any){
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
    loadCancelled(state, payload: any){
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
    loadFilledOrders(state, payload: any){
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
  // selectors: (slice, createSelector, hasProps) => ({

  // }),
  effects: (dispatch) => ({
    async loadExchangeAsync(payload: Contract, state) {
      dispatch.models_Exchange.loadExchange(payload);
    },
    async loadAllOrdersAsync(exchange: Contract, state){
      console.log("🚀 ~ file: index.ts ~ line 81 ~ loadAllOrdersAsync ~ exchange", exchange)
      // Fetch cancelled orders with the "Cancel" event stream
      const cancelStream = await exchange.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest' })
      console.log("🚀 ~ file: index.ts ~ line 83 ~ loadAllOrdersAsync ~ cancelStream", cancelStream)
      // Format cancelled orders
      const cancelledOrders = cancelStream.map((event) => event.returnValues)
      console.log("🚀 ~ file: index.ts ~ line 87 ~ loadAllOrdersAsync ~ cancelledOrders", cancelledOrders)
      // Add cancelled orders to the redux store
      dispatch.models_Exchange.loadCancelled(cancelledOrders)
      dispatch.models_Exchange.setCancelled(true)

      // Fetch filled orders with the "Trade" event stream
      const tradeStream = await exchange.getPastEvents('Trade', { fromBlock: 0, toBlock: 'latest' })
      // Format filled orders
      const filledOrders = tradeStream.map((event) => event.returnValues)
      console.log("🚀 ~ file: index.ts ~ line 96 ~ loadAllOrdersAsync ~ filledOrders", filledOrders)
      // Add cancelled orders to the redux store
      dispatch.models_Exchange.loadFilledOrders(filledOrders)
      dispatch.models_Exchange.setFilled(true)

      // Load order stream
      const orderStream = await exchange.getPastEvents('Order', { fromBlock: 0,  toBlock: 'latest' })
      // Format order stream
      const allOrders = orderStream.map((event) => event.returnValues)
      console.log("🚀 ~ file: index.ts ~ line 105 ~ loadAllOrdersAsync ~ allOrders", allOrders)
      // Add open orders to the redux store
      dispatch.models_Exchange.loadAllOrders(allOrders)
      dispatch.models_Exchange.setAllLoaded(true)
    },
  }),
});
