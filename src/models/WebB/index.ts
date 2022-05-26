import { createModel, init, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/stores/model';

const defaultState = {
  WEB3_LOADED: false,
  WEB3_ACCOUNT_LOADED: false,
  ETHER_BALANCE_LOADED: false,
};

export const models_WebB = createModel<RootModel>()({
  state: defaultState,
  reducers: {
    rename(state, payload: string): typeof defaultState {
      return {
        ...state,
        name: payload,
      };
    },
  },
  selectors: (slice, createSelector, hasProps) => ({

  }),
  effects: (dispatch: RematchDispatch) => ({
    // async renameAsync(payload: string, state) {
    //   dispatch.models_WebB.rename(payload);
    // },
  }),
});
