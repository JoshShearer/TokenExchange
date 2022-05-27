import React from 'react';
import { RootState, Actions } from '#src/models/store'
import { connect } from 'react-redux'

// import { Comps_layout_Balance } from '#src/Comps/layout/Balance';
// import { Comps_layout_Orders } from '#src/Comps/layout/Orders'; 
// import { Comps_layout_Orderbook } from '#src/Comps/layout/Orderbook';
// import { Comps_layout_Pricechart } from '#src/Comps/layout/Pricechart';
// import { Comps_layout_Trades } from '#src/Comps/layout/Trades';
import { Comps_misc_spinner } from '#src/Comps/misc/spinner';

// import { createStructureSelector } from '#src/selectors/util'
// import { userSelector } from '#src/stores/hooks';

// const defaultProps = {
//   key: 'default',
//   name: '',
// } as {
//   name: string;
//   key?: string;
//   children?: JSX.Element;
// };

// const selector = createStructuredSelector({
//    item: (root) => root.stores,
// })

// export const Comps_layout_MTBApp = (_props: typeof defaultProps) => {
//   const props = { ...defaultProps, ..._props };
//   // const selected = useSelector((state) => selector(state, props));

//   return (
//     <div className="Comps_layout_MTBApp">
//       <Comps_misc_placeholder>
//         <p>Comps_layout_MTBApp</p>
//       </Comps_misc_placeholder>
//     </div>
//   );
// };

export class Comps_layout_MTBApp extends React.PureComponent<Props> {
  componentDidMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props: Props) {
    const { dispatch, exchange } = props
    // await loadAllOrders(exchange, dispatch)
    // await subscribeToEvents(exchange, dispatch)
  }

	render() {

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-4 pr-4 ">
        <div className='sm:col-span-2 md:col-span-1 lg:col-span-1'>
          <div className="pb-4"><Comps_misc_spinner /></div>
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
// const selection = store.select((models) => ({
//   exchange: models.exchange.exchangeSelector,
// }));

const mapState = (state: RootState) => ({
	// exchange: exchangeSelector(RootState)
})
 
const mapActions = (dispatch: Actions) => ({
	// count: dispatch.count,
})
 
type SelectionProps = ReturnType<typeof selection>
type StateProps = ReturnType<typeof mapState>
type ActionsProps = ReturnType<typeof mapActions>
type Props = StateProps & ActionsProps & SelectionProps
 
connect(mapState)(Comps_layout_MTBApp)