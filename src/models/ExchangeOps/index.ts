import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';

type defaultState = {
  name: string,
};

export const models_ExchangeOps = createModel<RootModel>()({
  state: {
    name: 'initial'
  } as defaultState,
  reducers: {
    reducerRename(state, payload: string) {
      return {
        ...state,
        name: payload,
      };
    },
  },
  // selectors: (slice, createSelector, hasProps) => ({

  // }),
  effects: (dispatch) => ({
    // async reducerRenameAsync(payload: string, state) {
    //   dispatch.models_ExchangeLoadOps.reducerRename(payload);
    // },
    
  }),
});
