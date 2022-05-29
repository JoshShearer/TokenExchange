import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import { ETHER_ADDRESS, GREEN, RED, ether, formatBalance, tokens } from 'web3_eth/helpers'
import Web3 from 'web3';


const defaultState = {
  account: 'account',
  // connection: typeof Web3,
  connection: {},
  balance: 'notmuch', 
};

export const models_WebB = createModel<RootModel>()({
  name: "web3Model",
  state: defaultState,
  reducers: {
    web3Loader: (state, payload: {})  => {
      return {
        ...state,
        connection: payload,
      };
    },
    accountLoader: (state, payload: string) => {
      return {
        ...state,
        account: payload,
      };
    },
    balanceLoader: (state, payload: string) => {
      return {
        ...state,
        balance: formatBalance(payload),
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
    // async Web3LoaderAsync(payload: Web3, state: typeof defaultState) : Promise<void> {
    //   dispatch.models_WebB.web3Loader(payload);
    //   return state.models_WebB
    // }
  }),
});
