import React, { useEffect } from 'react';
// import Deposits from "./Deposits";
// import Orders from "./Orders";
// import OrderBook from "./Orderbook";
// import PriceChart from "./PriceChart";
// import MyTransactions from "./MyTransactions";
// import Trades from "./Trades";

import { RootState, Actions, dispatch } from '#src/models/store';


import { 
  // loadAllOrders, 
  // subscribeToEvents 
} from '#src/models/interactions';

// import useSelector from 'reselect';

import { createStructuredSelector } from '#src/models/util'
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
})

export const Comps_layout_MTBApp = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  useEffect(() => {
    loadBlockchainData()
  },[]);

  const selected = useSelector((state) => selector(state, props));
  
  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)
  const loadBlockchainData = async () => {
    
    await dispatch.models_Exchange.loadAllOrdersAsync(selected.exchange)
    await subscribeToEvents(exchange, dispatch)
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-4 pr-4 ">
      <div className='sm:col-span-2 md:col-span-1 lg:col-span-1'>
        {/* <div className="pb-4"><Deposits /></div>
        <div><Orders /></div>
      </div>
      <div>
        <OrderBook />
      </div>
      <div className='col-span-2 '>
        <div className="pb-4"><PriceChart /></div>
        <div ><MyTransactions /></div>
      </div>
      <div>
        <Trades /> */}
      </div>
    </div>
  );
};

// export class Comps_layout_MTBApp extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = this.props
// 		return <div>Comps_layout_MTBApp</div>
// 	}
// }

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

 