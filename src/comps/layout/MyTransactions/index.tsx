import React, { useEffect } from 'react';
import { Tab } from '@headlessui/react';

import { createStructuredSelector } from '#src/models/utils';
import { useSelector } from '#src/models/hooks';

import { RootState, Actions, dispatch, store } from '#src/models/store';
import { cancelOrder } from '#src/models/model_overflow';

import { Comps_misc_Spinner } from '#src/Comps/misc/Spinner';
import { Order } from '../../../../web3_eth/web3Types/Exchange';

const defaultProps = {
  idKey: 'default',
} as {
  idKey?: string;
  children?: JSX.Element;
};

const selector = createStructuredSelector({
  filledLoaded: (root) => root.models_Exchange.filledOrders.loaded,
  showMyOpenOrders: (root) =>
    root.models_Exchange.cancelledOrders.loaded &&
    root.models_Exchange.filledOrders.loaded &&
    root.models_Exchange.allOrders.loaded &&
    root.models_Exchange.cancelledOrders.loaded,
  myFilledOrders: store.select.models_Exchange.myFilledOrdersSelector,
  myOpenOrders: store.select.models_Exchange.myOpenOrdersSelector,
  exchange: (root) => root.models_Exchange.Exchange.data,
  account: (root) => root.models_WebB.account,
  orderCancelled: (root) => root.models_Exchange.orderCancelled,
});

function classNames(...classes: Array<String>) {
  return classes.filter(Boolean).join(' ');
}

export const Comps_layout_MyTransactions = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  const selected = useSelector((state) => selector(state, props));

  return (
    <div className="w-full max-w-lg p-2 mx-auto bg-stone-700 rounded">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-2xl text-white">My Transactions</h2>
        <br />
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-stone-500 rounded-lg">
            <Tab
              key="Trades"
              className={({ selected }) =>
                classNames(
                  'w-full text-white rounded-lg hover:text-white',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60',
                  selected
                    ? 'bg-stone-800 shadow text-white'
                    : 'text-white hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Trades
            </Tab>
            <Tab
              key="Orders"
              className={({ selected }) =>
                classNames(
                  'w-full text-white rounded-lg hover:text-white',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60',
                  selected
                    ? 'bg-stone-800 shadow text-white'
                    : 'text-white hover:bg-stone-300/[0.12] hover:text-white'
                )
              }
            >
              Orders
            </Tab>
            <Tab disabled> </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="mt-8 flex flex-col">
                <div className="my-2 mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
                    <table className=" min-w-full divide-y divide-white">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                          >
                            Time
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                          >
                            MTB
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                          >
                            MTB/ETH
                          </th>
                        </tr>
                      </thead>
                      {selected.filledLoaded ? (
                        showMyFilledOrders(selected.myFilledOrders)
                      ) : (
                        <Comps_misc_Spinner type="table" />
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-8 flex flex-col">
                <div className="my-2 mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
                    <table className=" min-w-full divide-y divide-white">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                          >
                            MTB/ETH
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                          >
                            Cancel
                          </th>
                        </tr>
                      </thead>
                      {selected.filledLoaded ? (
                        showMyOpenOrders(selected)
                      ) : (
                        <Comps_misc_Spinner type="table" />
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

const showMyFilledOrders = (props: Array<Order>) => {
  const filledOrders = props;

  return (
    <tbody className="divide-y divide-grey-400">
      {filledOrders.map((order: Order) => {
        return (
          <tr key={order.id}>
            <td className="text-stone-500">{order.formattedTimestamp}</td>
            {order.orderTypeClass === 'red' ? (
              <>
                <td className="text-red-500">
                  {order.orderSign}
                  {order.tokenAmount}
                </td>
                <td className="text-red-500">{order.tokenPrice}</td>
              </>
            ) : (
              <>
                <td className="text-green-500">
                  {order.orderSign}
                  {order.tokenAmount}
                </td>
                <td className="text-green-500">{order.tokenPrice}</td>
              </>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

const showMyOpenOrders = (props) => {
  const { myOpenOrders, exchange, account } = props;

  return (
    <tbody>
      {myOpenOrders.map((order) => {
        return (
          <tr key={order.id}>
            {order.orderTypeClass === 'red' ? (
              <>
                <td className="text-red-500">{order.tokenAmount}</td>
                <td className="text-red-500">{order.tokenPrice}</td>
              </>
            ) : (
              <>
                <td className="text-green-500">{order.tokenAmount}</td>
                <td className="text-green-500">{order.tokenPrice}</td>
              </>
            )}
            <td
              className="text-stone-500 cancel-order cursor-pointer"
              onClick={(e) => {
                cancelOrder(exchange, order, account);
              }}
            >
              X
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
