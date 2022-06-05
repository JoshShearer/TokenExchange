import { createModel, RematchDispatch } from '@rematch/core';
import type { RootModel } from '#src/models/model';

type defaultState = {
  orderCancelling: boolean;
};

export const models_ExchangeOps = createModel<RootModel>()({
  state: {
    orderCancelling: false,
  } as defaultState,
  reducers: {
    setCancelling(state, payload: boolean) {
      return {
        ...state,
        orderCancelling: payload,
      };
    },
    orderCancelled(state, order: Order) {
      return {
        ...state,
        orderCancelling: false,
      };
    },
  },
  // selectors: (slice, createSelector, hasProps) => ({

  // }),
  effects: (dispatch) => ({
    async subscribeToEventsAsync(exchange: ExCon, state) {
      console.log(
        '🚀 ~ file: index.ts ~ line 140 ~ subscribeToEventsAsync ~ exchange',
        exchange
      );
      const anonymous = async (exchange: ExCon) => {
        exchange.events.Cancel({}, (error, event) => {
          console.log(
            '🚀 ~ file: index.ts ~ line 144 ~ exchange.events.Cancel ~ event',
            event
          );

          dispatch.models_ExchangeLoad.orderCancelled(event.returnValues);
        });

        exchange.events.Trade({}, (error, event) => {
          dispatch.models_ExchangeLoad.orderFilled(event.returnValues);
        });

        exchange.events.Deposit({}, (error, event) => {
          dispatch.models_ExchangeLoad.balancesLoaded();
        });

        exchange.events.Withdraw({}, (error, event) => {
          dispatch.models_ExchangeLoad.balancesLoaded();
        });

        exchange.events.Order({}, (error, event) => {
          dispatch.models_ExchangeLoad.orderMade(event.returnValues);
        });
      };
      await anonymous(exchange);
    },
  }),
});
