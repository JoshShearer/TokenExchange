import React, { useEffect } from 'react';
import { Comps_misc_Spinner } from '#src/Comps/misc/Spinner';
import { RootState, Actions, dispatch, store } from '#src/models/store'

import { createStructuredSelector } from '#src/models/utils'
import { useSelector } from '#src/models/hooks';

import type { Order } from '../../../../web3_eth/web3Types/Exchange';


const defaultProps = {
  ordersFilled: [],
  idKey: 'default',
} as {
  ordersFilled: Array<Order>;
  idKey?: string;
  children?: JSX.Element;
};
const selector = createStructuredSelector({
  //  filledLoaded: (root) => root.models_ExchangeLoad.filledLoaded,
  //  filledOrders: (root) => store.select.models_ExchangeLoad.filledOrdersSelector
})

export const Comps_layout_Trades = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  const selected = useSelector((state: RootState) => selector(state, props));
  var ordersFilled = props.ordersFilled
  ordersFilled = useSelector(store.select.models_ExchangeLoad.filledOrdersSelector)

  return (

    <div className="w-full max-w-sm p-2 mx-auto bg-stone-700 rounded">
      <div className="py-5 sm:p-6">
          <h2 className="text-2xl text-white">Trades</h2>
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
                <table className=' min-w-full divide-y divide-white'>
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-left text-sm font-semibold text-white"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="text-left text-sm font-semibold text-white"
                      >
                        MTB
                      </th>
                      <th
                        scope="col"
                        className="text-left text-sm font-semibold text-white"
                      >
                        MTB/ETH
                      </th>
                    </tr>
                  </thead>
                  {selected.filledLoaded ? showFilledOrders(ordersFilled) : <Comps_misc_Spinner type="table" />}
                </table>
                <br />
              </div>
            </div>
          </div>
        </div>
)
};

const showFilledOrders = (filledOrders: Array<Order>) => {
  return (
    <tbody className='divide-y divide-grey-400'>
      {filledOrders.map((order: Order) => {
        return (
          <tr className={`order-${order.id}`} key={order.id}>
            <td className="text-stone-500">{order.formattedTimestamp}</td>
            <td className='text-white'>{order.tokenAmount}</td>
            {order.tokenPriceClass === 'red' ?
              <td className='text-red-500'>{order.tokenPrice}</td>
              : <td className='text-green-500'>{order.tokenPrice}</td>
            }
          </tr>
        );
      })}
    </tbody>
  );
};