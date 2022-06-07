import React, { useEffect } from 'react';
import { Comps_layout_Deposits } from '#src/Comps/layout/Deposits';
import { Comps_layout_Orders } from '#src/Comps/layout/Orders';
import { Comps_layout_OrderBook } from '#src/Comps/layout/Orderbook';
import { Comps_layout_PriceChart } from '#src/Comps/layout/PriceChart';
import { Comps_layout_MyTransactions } from '#src/Comps/layout/MyTransactions';
import { Comps_layout_Trades } from '#src/Comps/layout/Trades';

import { RootState, Actions, dispatch } from '#src/models/store';

import { subscribeToEvents } from '#src/models/model_overflow';

// import useSelector from 'reselect';

import { createStructuredSelector } from '#src/models/utils';
import { useSelector } from '#src/models/hooks';

// import { RootState, Actions, dispatch, store } from '#src/models/store'
// import { models_Exchange } from '../../../models/Exchange/index';

const defaultProps = {
  idKey: 'default',
} as {
  idKey?: string;
  children?: JSX.Element;
};

const selector = createStructuredSelector({
  exchange: (root) => root.models_Exchange.Exchange,
  dataLoaded: (root) => root.models_Exchange.allLoaded,
});

export const Comps_layout_MTBApp = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const selected = useSelector((state) => selector(state, props));

  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)
  const loadBlockchainData = async () => {
    await dispatch.models_Exchange.loadAllOrdersAsync(selected.exchange);
    await subscribeToEvents(selected.exchange);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-4 pr-4 ">
      <div className="sm:col-span-2 md:col-span-1 lg:col-span-1">
        <div>
          <div className="pb-4">
            <Comps_layout_Deposits />
          </div>
          <div>
            <Comps_layout_Orders />
          </div>
        </div>
        <div>
          <Comps_layout_OrderBook />
        </div>
        <div className="col-span-2 ">
          <div className="pb-4">
            <Comps_layout_PriceChart />
          </div>
          <div>
            <Comps_layout_MyTransactions />
          </div>
        </div>
        <div>
          <Comps_layout_Trades />
        </div>
      </div>
    </div>
  );
};
