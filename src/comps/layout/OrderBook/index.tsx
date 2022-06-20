import React from 'react';

import { createStructuredSelector } from '#src/models/utils';
import { useSelector } from '#src/models/hooks';
import { fillOrder } from '#src/models/model_overflow';

import { RootState, Actions, dispatch, store } from '#src/models/store';
import {
  orderBookSelector,
  orderBookLoadedSelector,
  orderFillingSelector
} from '#src/models/selectors'

import { Comps_misc_Spinner } from '#src/Comps/misc/Spinner';
import { Comps_misc_Tooltip } from '#src/Comps/misc/Tooltip';

const defaultProps = {
  idKey: 'default',
} as {
  idKey?: string;
  children?: JSX.Element;
};


const selector = createStructuredSelector({
  showOrderBook: (root) =>
    orderBookLoadedSelector(root) &&
    !orderFillingSelector(root),
  orderBook: (root) => orderBookSelector(root),
  exchange: (root) => root.models_Exchange.Exchange.data,
  account: (root) => root.models_WebB.account,
});

export const Comps_layout_OrderBook = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  const selected = useSelector((state) => selector(state, props));

  return (
    <div className="w-full max-w-sm mx-auto bg-stone-700 rounded">
      <div className="py-5 px-4 sm:p-6">
        <h2 className="text-2xl text-white">Order Book</h2>
        <div className="my-2 mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
            <table className=" min-w-full divide-y divide-grey-400">
              {selected.showOrderBook ? (
                showOrderBook(selected)
              ) : (
                <Comps_misc_Spinner  />
              )}
            </table>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

const renderOrder = (props) => {
  const { exchange, account, order } = props;
  const orderColor = `text-${order.orderTypeClass}-500`;
  return (
    // <Tooltip tooltipMessage="{`Click here to ${order.orderFillAction}`}">

    <tr
      key={order.id}
      className="order-book-order cursor-pointer"
      onClick={(e) => fillOrder(exchange, account, order)}
    >
      <td className="text-white">{order.tokenAmount}</td>
      {order.orderTypeClass === 'red' ? (
        <td className="text-red-500">{order.tokenPrice}</td>
      ) : (
        <td className="text-green-500">{order.tokenPrice}</td>
      )}
      <td className="text-white">{order.etherAmount}</td>
    </tr>
    // </Tooltip>
  );
};

const showOrderBook = (props) => {
  const { exchange, account, orderBook } = props;

  return (
    <tbody className="divide-y divide-gray-400">
      {orderBook.sellOrders.map((order) => renderOrder({exchange, account, order}))}
      <tr>
        <td scope="col" className="text-sm font-semibold text-white">
          MTB
        </td>
        <td scope="col" className="text-sm font-semibold text-white">
          MTB/ETH
        </td>
        <td scope="col" className="text-sm font-semibold text-white">
          ETH
        </td>
      </tr>
      <br />
      {orderBook.buyOrders.map((order) => renderOrder({exchange, account, order}))}
    </tbody>
  );
};
