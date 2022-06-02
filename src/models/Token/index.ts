import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';
import type { Token } from '../../../web3_eth/web3Types/Token';


type defaultState = {
  Token: Token,
  tokenLoaded: boolean
};

export const models_Token = createModel<RootModel>()({
  state: {
    Token : {},
    tokenLoaded: false,
  } as defaultState,
  reducers: {
    loadToken(state, payload: Token) {
      return {
        ...state,
        Token: payload,
      };
    },
    setTokenLoaded(state, payload: boolean) {
      return {
        ...state,
        tokenLoaded: payload,
      };
    },
  },
  // selectors: (slice, createSelector, hasProps) => ({

  // }),
  effects: (dispatch) => ({
    async loadTokenAsync(payload: Token, state) {
      dispatch.models_Token.loadToken(payload);
      dispatch.models_Token.setTokenLoaded(true);
    },
  }),
});
