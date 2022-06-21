import { createModel, RematchDispatch } from '@rematch/core';
import { defaults, get, groupBy, reject } from 'lodash';
import type { RootModel } from '#src/models/model';
import { patch } from '../patch';
import type {
  Exchange as ExCon,
  Order,
} from '../../../web3_eth/web3Types/Exchange';

type defaultState = {
  Exchange: {
    contract: ExCon;
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
      contract: {} as ExCon,
      loaded: false,
    },
    cancelledOrders: {
      data: {} as Array<Order>,
      loaded: false,
    },
    filledOrders: {
      data: {} as Array<Order>,
      loaded: false,
    },
    allOrders: {
      data: {} as Array<Order>,
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
      const index = state.filledOrders.data.findIndex(
        (orderS) => orderS.id === order.id
      );
      let data;
      if (index === -1) {
        data = [...state.filledOrders.data, order];
      } else {
        data = state.filledOrders.data;
      }
      
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
