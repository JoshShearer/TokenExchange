import React, { useEffect } from 'react';
import { Comps_layout_Deposits } from '#src/Comps/layout/Deposits';
import { Comps_layout_Orders } from '#src/Comps/layout/Orders';
import { Comps_layout_OrderBook } from '#src/Comps/layout/OrderBook';
import { Comps_layout_PriceChart } from '#src/Comps/layout/PriceChart';
import { Comps_layout_MyTransactions } from '#src/Comps/layout/MyTransactions';
import { Comps_layout_Trades } from '#src/Comps/layout/Trades';
import { Comps_misc_Spinner } from '#src/Comps/misc/Spinner';
import { dispatch } from '#src/models/store';

import { subscribeToEvents } from '#src/models/exchange_methods';


import { createStructuredSelector } from '#src/models/utils';
import { useSelector } from '#src/models/hooks';

const defaultProps = {
  idKey: 'default',
} as {
  idKey?: string;
  children?: JSX.Element;
};

const selector = createStructuredSelector({
  exchange: (root) => root.models_Exchange.Exchange.data,
  showForm: (root) => root.models_Exchange.allOrders.loaded,
});

export const Comps_layout_MTBApp = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const selected = useSelector((state) => selector(state, props));


  const loadBlockchainData = async () => {
    await dispatch.models_Exchange.loadAllOrdersAsync(selected.exchange);
    await subscribeToEvents(selected.exchange);
  };

  return (
    <div>{selected.showForm ? showComps() : <Comps_misc_Spinner />}</div>
  )

  
};

const showComps = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pl-4 pr-4 ">
      {/* <div className="sm:col-span-1 md:col-span-1 lg:col-span-1"> */}
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
    // </div>
  );
}