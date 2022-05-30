import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';

const defaultState = {
  name: '',
};

export const CREDITOR_UNDERSCORE_NAME = createModel<RootModel>()({
  state: defaultState,
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
  effects: (dispatch: RematchDispatch) => ({
    // async reducerRenameAsync(payload: string, state) {
    //   dispatch.CREDITOR_UNDERSCORE_NAME.reducerRename(payload);
    // },
  }),
});
