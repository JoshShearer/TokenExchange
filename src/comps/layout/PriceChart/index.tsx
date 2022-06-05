import React, { useEffect } from 'react';
const Chart = dynamic(() => import('react-apexcharts'), {ssr: false})
import dynamic from 'next/dynamic';
import { chartOptions } from './PriceChart.config'

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

export const Comps_layout_PriceChart = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  
  // useEffect(() => {
    
  // },[]);

  // const selected = useSelector((state) => selector(state, props));

  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)


  return (
    // <div className="w-full px-3 pt-3 ">
      <div className="w-full max-w-lg p-2 min-h-fit mx-auto bg-stone-700 rounded">
        <div className="px-4 py-5 sm:p-6">
          {/* <div className="relative"> */}
            <h2 className="text-2xl text-white">Price Chart</h2>
            <br/>
            {props.priceChartLoaded ? showPriceChart(props.priceChart) : <Comps_misc_Spinner />}
          </div>
        </div>
    //   </div>
    // </div>
  )
};

// export class Comps_layout_PriceChart extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = props
// 		return <div>Comps_layout_PriceChart</div>
// 	}
// }

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

const priceSymbol = (lastPriceChange) => {
  let output
  if(lastPriceChange === '+') {
    output = <span className="text-green-500">&#9650;</span> // Green up tiangle
  } else {
    output = <span className="text-red-500">&#9660;</span> // Red down triangle
  }
  return(output)
}

const showPriceChart = (priceChart) => {
  return(
    <div className="text-white text-2xl">
      <div className="price">
        <h2>{"   "}MTB/ETH &nbsp; {priceSymbol(priceChart.lastPriceChange)} &nbsp; {priceChart.lastPrice}</h2>
      </div>
      <Chart options={chartOptions} series={priceChart.series} type='candlestick' width='100%' height='auto' />
    </div>
  )
}