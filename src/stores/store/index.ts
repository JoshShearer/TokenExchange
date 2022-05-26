import { createModel } from '@rematch/core';
import type { RootModel } from '#src/stores/model';

const defaultState = {
  name: '',
};


export const stores_store = createModel<RootModel>()({
  state: defaultState,
  reducers: {
    rename(state, payload: string): typeof defaultState {
      return {
        ...state,
        name: payload,
      };
    },
  },
  effects: (dispatch) => ({
    // async renameAsync(payload: string, state) {
    //   dispatch.stores_store.rename(payload);
    // },
  }),
});
