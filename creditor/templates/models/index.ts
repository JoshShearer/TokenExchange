import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';

type defaultState = {
  name: string,
};

export const CREDITOR_UNDERSCORE_NAME = createModel<RootModel>()({
  state: {
    name: 'initial'
  } as defaultState,
  reducers: {
    reducerRename(state, payload: string): typeof defaultState {
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
    //   dispatch.CREDITOR_UNDERSCORE_NAME.reducerRename(payload);
    // },
  }),
});
