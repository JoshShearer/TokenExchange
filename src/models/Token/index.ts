import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import { Contract } from 'web3_eth';

type defaultState = {
  Token: Contract,
};

export const models_Token = createModel<RootModel>()({
  state: {
    Token : {},
  } as defaultState,
  reducers: {
    loadToken(state, payload: Contract) {
      return {
        ...state,
        Token: payload,
      };
    },
  },
  // selectors: (slice, createSelector, hasProps) => ({

  // }),
  effects: (dispatch) => ({
    async loadTokenAsync(payload: Contract, state) {
      dispatch.models_Token.loadToken(payload);
    },
  }),
});
