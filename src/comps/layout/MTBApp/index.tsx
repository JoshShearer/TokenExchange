import React from 'react';
// import { RootState, Dispatch } from '#src/stores/store'
// import { connect } from 'react-redux'
// import { useDispatch } from 'react-redux'

import { comps_layout_Balance } from '#src/comps/layout/Balance';
// import { comps_layout_Orders } from '#src/comps/layout/Orders'; 
// import { comps_layout_Orderbook } from '#src/comps/layout/Orderbook';
// import { comps_layout_Pricechart } from '#src/comps/layout/Pricechart';
// import { comps_layout_Trades } from '#src/comps/layout/Trades';


// import { createStructureSelector } from '#src/selectors/util'
// import { userSelector } from '#src/stores/hooks';

const defaultProps = {
  key: 'default',
  name: '',
} as {
  name: string;
  key?: string;
  children?: JSX.Element;
};

// const selector = createStructuredSelector({
//    item: (root) => root.stores,
// })

// export const comps_layout_MTBApp = (_props: typeof defaultProps) => {
//   const props = { ...defaultProps, ..._props };
//   // const selected = useSelector((state) => selector(state, props));

//   return (
//     <div className="comps_layout_MTBApp">
//       <Comps_misc_placeholder>
//         <p>comps_layout_MTBApp</p>
//       </Comps_misc_placeholder>
//     </div>
//   );
// };

class comps_layout_MTBApp extends React.PureComponent<Props> {
	render() {
		const { countState } = this.props
		return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-4 pr-4 ">
        <div className='sm:col-span-2 md:col-span-1 lg:col-span-1'>
          <div className="pb-4"><comps_layout_Balance /></div>
          {/* <div><Orders /></div>
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
	}
}

// const mapState = (state: RootState) => ({
// 	countState: state.count,
// })
 
// const mapDispatch = (dispatch: Dispatch) => ({
// 	count: dispatch.count,
// })
 
type StateProps = ReturnType<typeof mapState>
// type DispatchProps = ReturnType<typeof mapDispatch>
// type Props = StateProps & DispatchProps
 
export default connect(mapState, mapDispatch)(comps_layout_MTBApp)