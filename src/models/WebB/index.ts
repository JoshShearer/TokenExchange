import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import Web3 from 'web3';
import { Eth } from 'web3';
import { RootState } from 'react-redux';
import { models_ExchangeLoad } from '#src/models/ExchangeLoad';
import { models_Token } from '../Token/index';


type defaultState = {
  account: string,
  balance: string,
  Web3Conn: Eth,
};

export const models_WebB = createModel<RootModel>()({
  state: {
    account: 'unknown',
    balance: 'empty',
    Web3Conn: {},
  } as defaultState,
  reducers: {
    loadWeb3(state, payload: defaultState) {
      return {
        ...state,
       Web3Conn: payload,
      }
    },
    loadAcc(state, payload: string){
      return {
        ...state,
       account: payload,
      }
    },
    loadBal(state, payload: string){
      return {
        ...state,
        balance: payload,
      }
    },
  },
  // selectors: (slice, createSelector) => ({
  //   accountSelector(){
  //     return createSelector(
  //       [slice, (rootState) => rootState.models_webB.account],
  //         (defaultState, account) => {
  //           return account as String;
  //         },
  //     )
  //       }
  // }),
  effects: (dispatch) => ({
    async loadWeb3Async(Web3: Eth, state) { 
      const aData = await Web3.eth.getAccounts()
      const account = aData[0]
      dispatch.models_WebB.loadAcc(account);
      dispatch.models_WebB.loadWeb3(Web3);
    },
  }),
});
