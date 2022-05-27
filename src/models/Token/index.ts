import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';

const defaultState = {
  TOKEN_LOADED: false,
  TOKEN_BALANCE_LOADED: false,
  contract: '',
};

export const models_Token = createModel<RootModel>()({
  state: defaultState,
  reducers: {
    rename(state, payload: string): typeof defaultState {
      return {
        ...state,
        TOKEN_LOADED: payload,
      };
    },
  },
  selectors: (slice, createSelector, hasProps) => ({

  }),
  effects: (dispatch: RematchDispatch) => ({
    // async renameAsync(payload: string, state) {
    //   dispatch.models_Token.rename(payload);
    // },
  }),
});
