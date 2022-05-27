import React from 'react';
import { Comps_layout_Navigation_Header } from '#src/Comps/layout/Navigation/Header';
import { Comps_layout_Navigation_Footer } from '#src/Comps/layout/Navigation/Footer';
import { Comps_layout_MTBApp } from '#src/Comps/layout/MTBApp';

import { RootState, Actions } from '#src/models/store';
import { connect } from 'react-redux';

import { loadWeb3 } from '#src/models/interactions';

// import { Comps_misc_placeholder } from '#src/Comps';

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

// export const Comps_layout_App = (_props: typeof defaultProps) => {
//   const props = { ...defaultProps, ..._props };
//   // const selected = useSelector((state) => selector(state, props));

//   return (
//     <div className="Comps_layout_App">
//       <Comps_misc_placeholder>
//         <p>Comps_layout_App</p>
//       </Comps_misc_placeholder>
//     </div>
//   );
// };

export class Comps_layout_App extends React.PureComponent<Props> {
  componentDidMount() {
    this.loadBlockchainData()
  }
  // console.log("🚀 ~ file: index.tsx ~ line 43 ~ Comps_layout_App ~ //componentDidMount ~ props", this.props.state)

  async loadBlockchainData() {
  // console.log("🚀 ~ file: index.tsx ~ line 47 ~ Comps_layout_App ~ loadBlockchainData ~ dispatch", dispatch)
    const myWeb3 = await loadWeb3(this.props.web3Loader)
    // props.WebLoader(myWeb3)
    console.log("🚀 ~ file: index.tsx ~ line 52 ~ Comps_layout_App ~ loadBlockchainData ~ state Connection", this.props.state.models_WebB.connection)
    const networkId = await myWeb3.eth.net.getId()
  //   await loadAccount(web3, dispatch)
  //   const token = await loadToken(web3, networkId, dispatch)
  //   if (!token) {
  //     window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.')
  //     return
  //   }
  //   const exchange = await loadExchange(web3, networkId, dispatch)
  //   if (!exchange) {
  //     window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamask.')
  //     return
  //   }
  }

	render() {
		// const { countState } = this.props
		return (
    <div>
      <Comps_layout_Navigation_Header/>
      {/* { this.props.contractsLoaded ? <MTBApp /> : <div className="content"></div> } */}
      <Comps_layout_MTBApp/>
      <Comps_layout_Navigation_Footer/>

    </div>

    )
	}
}

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

const mapState = (state: RootState) => ({
	state: state,
})
 
const mapDispatch = (dispatch: Actions) => ({
	dispatch: dispatch.models_WebB,
  web3Loader: dispatch.models_WebB.web3Loader,
})
 
type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>
type Props = StateProps & DispatchProps
 
connect(mapState, mapDispatch)(Comps_layout_App)