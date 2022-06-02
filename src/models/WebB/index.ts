import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import Web3 from 'web3';
import { Eth } from 'web3';
import { RootState } from 'react-redux';

// type Web3Connection = typeof( new Web3(''));
// const conn = new Web3('ws://localhost:8545')
// const web3c = typeof conn;
// console.log("🚀 ~ file: index.ts ~ line 9 ~ web3c", web3c)

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
    }
    },
  // selectors: (slice, createSelector, hasProps) => ({

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
