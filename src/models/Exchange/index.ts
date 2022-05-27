import { createModel, init, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';

const defaultState = {
  EXCHANGE_LOADED: '',
  CANCELLED_ORDERS_LOADED: '',
  FILLED_ORDERS_LOADED: '',
  ALL_ORDERS_LOADED: '',
  ORDER_CANCELLING: '',
  ORDER_CANCELLED: '',
  name: '',
  name: '',

};

export const models_Exchange = createModel<RootModel>()({
  state: defaultState,
  reducers: {
    rename(state, payload: string): typeof defaultState {
      return {
        ...state,
        EXCHANGE_LOADED: payload,
      };
    },
  },
  selectors: (slice, createSelector, hasProps) => ({

  }),
  effects: (dispatch: RematchDispatch) => ({
    // async renameAsync(payload: string, state) {
    //   dispatch.models_Exchange.rename(payload);
    // },
  }),
});
