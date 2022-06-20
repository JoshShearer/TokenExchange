import React, { useEffect } from 'react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import dynamic from 'next/dynamic';
import { chartOptions } from './PriceChart.config';

import { createStructuredSelector } from '#src/models/utils';
import { useSelector } from '#src/models/hooks';

import { RootState, Actions, dispatch, store } from '#src/models/store';

import { Comps_misc_Spinner } from '#src/Comps/misc/Spinner';
import { models_Exchange } from '../../../models/Exchange/index';

import { priceChartSelector } from '#src/models/selectors';

const defaultProps = {
  idKey: 'default',
} as {
  idKey?: string;
  children?: JSX.Element;
};
const selector = createStructuredSelector({
  priceChartLoaded: (root) => root.models_Exchange.filledOrders.loaded,
  priceChart: (root) => priceChartSelector(root),
});

export const Comps_layout_PriceChart = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  const selected = useSelector((state) => selector(state, props));

  return (
    <div className="w-full max-w-lg p-2 min-h-fit mx-auto bg-stone-700 rounded">
      <div className="px-4 py-5 sm:p-6">
        <div className="relative">
        <h2 className="text-2xl text-white">Price Chart</h2>
        <br />
        {selected.priceChartLoaded ? (
          showPriceChart(selected.priceChart)
        ) : (
          <Comps_misc_Spinner />
        )}
      </div>
    </div>
     </div>
  );
};

const priceSymbol = (lastPriceChange) => {
  let output;
  if (lastPriceChange === '+') {
    output = <span className="text-green-500">&#9650;</span>; // Green up tiangle
  } else {
    output = <span className="text-red-500">&#9660;</span>; // Red down triangle
  }
  return output;
};

const showPriceChart = (priceChart) => {
  return (
    <div className="text-white text-2xl">
      <div className="price">
        <h2>
          {'   '}MTB/ETH &nbsp; {priceSymbol(priceChart.lastPriceChange)} &nbsp;{' '}
          {priceChart.lastPrice}
        </h2>
      </div>
      <Chart
        options={chartOptions}
        series={priceChart.series}
        type="candlestick"
        width="100%"
        height="auto"
      />
    </div>
  );
};
