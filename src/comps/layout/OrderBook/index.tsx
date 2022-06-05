import React, { useEffect } from 'react';
// import useSelector from 'reselect';

// import { createStructureSelector } from '#src/models/utils'
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

export const Comps_layout_OrderBook = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  
  // useEffect(() => {
    
  // },[]);

  // const selected = useSelector((state) => selector(state, props));

  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)


  return (

    <div className="w-full max-w-sm mx-auto min-w-fit bg-stone-700 rounded">
      <div className="py-5 sm:p-6">
          <h2 className="text-2xl text-white">Order Book</h2>
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"></div>
                <table className=' min-w-full divide-y divide-grey-400'>
                  {props.showOrderBook ? showOrderBook(props) : <Comps_misc_Spinner type='table' />}
                </table>
                <br />
              </div>
        </div>
    </div>
  </div>
)
};

// export class Comps_layout_OrderBook extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = props
// 		return <div>Comps_layout_OrderBook</div>
// 	}
// }

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

const renderOrder = (order, props) => {
  const { dispatch, exchange, account } = props
  const orderColor = `text-${order.orderTypeClass}-500`
  return (

    // <Tooltip tooltipMessage="{`Click here to ${order.orderFillAction}`}">

      <tr
        key={order.id}
        className="order-book-order"
        onClick={(e) => fillOrder(dispatch, exchange, order, account)}
      >
        <td className='text-white'>{order.tokenAmount}</td>
        {order.orderTypeClass === 'red' ?
          <td className='text-red-500'>{order.tokenPrice}</td>
          : <td className='text-green-500'>{order.tokenPrice}</td>
        }
        <td className='text-white'>{order.etherAmount}</td>
      </tr>
    // </Tooltip>


  )
}

const showOrderBook = (props) => {
  const { orderBook } = props

  return (
    <tbody className="divide-y divide-gray-400">
      {orderBook.sellOrders.map((order) => renderOrder(order, props))}
      <tr>
        <td
          scope="col"
          className="text-sm font-semibold text-white"
        >
          MTB
        </td>
        <td
          scope="col"
          className="text-sm font-semibold text-white"
        >
          MTB/ETH
        </td>
        <td
          scope="col"
          className="text-sm font-semibold text-white"
        >
          ETH
        </td>
      </tr>
      <br />
      {orderBook.buyOrders.map((order) => renderOrder(order, props))}
    </tbody>
  )
}