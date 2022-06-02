import React, { useEffect } from 'react';
import { Tab } from "@headlessui/react";

// import useSelector from 'reselect';

// import { createStructureSelector } from '#src/models/util'
// import { userSelector } from '#src/models/hooks';

// import { RootState, Actions, dispatch, store } from '#src/models/store'

import { Comps_misc_Spinner } from '#src/Comps/misc/Spinner';

const defaultProps = {
  idKey: 'default',
} as {
  idKey?: string;
  children?: JSX.Element;
};
// const selector = createStructuredSelector({
//    item: (root) => root.stores,
// })
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export const Comps_layout_MyTransactions = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  // useEffect(() => {

  // },[]);

  // const selected = useSelector((state) => selector(state, props));

  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)

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
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                      {this.props.showMyFilledOrders ? (
                        showMyFilledOrders(this.props)
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
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                      {this.props.showMyOpenOrders ? (
                        showMyOpenOrders(this.props)
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

// export class Comps_layout_MyTransactions extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = this.props
// 		return <div>Comps_layout_MyTransactions</div>
// 	}
// }

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

const showMyFilledOrders = (props) => {
  const { myFilledOrders } = props;

  return (
    <tbody className="divide-y divide-grey-400">
      {myFilledOrders.map((order) => {
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
  const { myOpenOrders, dispatch, exchange, account } = props;

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
              className="text-stone-500 cancel-order"
              onClick={(e) => {
                cancelOrder(dispatch, exchange, order, account);
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
