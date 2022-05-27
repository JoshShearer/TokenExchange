import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import { get, groupBy, reject, maxBy, minBy } from 'lodash';
import { ETHER_ADDRESS, GREEN, RED, ether, formatBalance, tokens } from 'web3_eth/helpers'
import Web3 from 'web3';


const defaultState = {
  account: ETHER_ADDRESS,
  connection: typeof Web3,
  balance: '', 
};

export const models_WebB = createModel<RootModel>()({
  name: "web3",
  state: defaultState,
  reducers: {
    web3Loader: (state: typeof defaultState, payload: Web3)  => {
      return {
        ...state,
        connection: payload
      };
    },
    accountLoader: (state, payload: string): typeof defaultState => {
      return {
        ...state,
        account: payload
      };
    },
    balanceLoader: (state, payload: string): typeof defaultState => {
      return {
        ...state,
        balance: formatBalance(payload)
      };
    },
  },
  // selectors: (slice, createSelector, hasProps) => ({
  //   accountSelector(){
  //     return slice((web3) =>  get(web3.account, 'web3.account'))
  //   };
  //   web3Selector(){
  //     return slice((web3) => get(web3.connection, 'web3.connection'))
  //   };
  //   etherBalanceSelector(){
  //     return slice((web3) => 
  //     get(web3, 'web3.balance', 0)
  //   }
  // }),
  effects: (dispatch) => ({
    async Web3LoaderAsync(payload: Web3, state: typeof defaultState) : Promise<void> {
      dispatch.models_WebB.Web3Loader(payload);
      return state.models_WebB
    }
  }),
});
