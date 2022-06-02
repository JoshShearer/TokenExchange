import React, { useEffect } from 'react';

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

export const Comps_layout_Trades = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  
  // useEffect(() => {
    
  // },[]);

  // const selected = useSelector((state) => selector(state, props));

  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)


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
                  {props.filledOrdersLoaded ? showFilledOrders(props.filledOrders) : <Comps_misc_Spinner type="table" />}
                </table>
                <br />
              </div>
            </div>
          </div>
        </div>
)
};

// export class Comps_layout_Trades extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = props
// 		return <div>Comps_layout_Trades</div>
// 	}
// }

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

const showFilledOrders = (filledOrders) => {
  return (
    <tbody className='divide-y divide-grey-400'>
      {filledOrders.map((order) => {
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