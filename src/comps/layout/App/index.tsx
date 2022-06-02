import React, { useEffect } from 'react';
import { Comps_layout_Navigation_Header } from '#src/Comps/layout/Navigation/Header';
import { Comps_layout_Navigation_Footer } from '#src/Comps/layout/Navigation/Footer';
import { Comps_layout_MTBApp } from '#src/Comps/layout/MTBApp';

import { RootState, Actions, dispatch } from '#src/models/store';

import {
  web3Loader,
  loadToken,
  loadExchange
} from '#src/models/interactions'
// import useSelector from 'reselect';

import { createStructuredSelector } from '#src/models/util'
import { useSelector } from '#src/models/hooks';


// import { RootState, Actions, dispatch, store } from '#src/models/store'

const defaultProps = {
  idKey: 'default', 
  } as {
  idKey?: string;
  children?: JSX.Element;
};

const selector = createStructuredSelector({
   contractsLoaded: (root) => root.models_Exchange.exchangeLoaded && root.models_Token.tokenLoaded
})

export const Comps_layout_App = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  useEffect(() => {
    loadBlockchainData()
  },[]);


  const selected = useSelector((state) => selector(state, props));
  
  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)
  const loadBlockchainData = async () => {
    const web3 = await web3Loader(dispatch.models_WebB)
    const networkId = await web3.eth.net.getId()
    const token = await loadToken(web3, networkId, dispatch.models_Token)
    if (!token) {
      window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.')
      return
    }
    const exchange = await loadExchange(web3, networkId, dispatch.models_Exchange)
    if (!exchange) {
      window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamask.')
      return
    }

  }


  return (
    <div>
      <Comps_layout_Navigation_Header/>
      { selected.contractsLoaded ? <Comps_layout_MTBApp /> : <div className="content"></div> }
      {/* <Comps_layout_MTBApp /> */}
      <Comps_layout_Navigation_Footer/>
    </div>

    )
};

// export class Comps_layout_App extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = this.props
// 		return <div>Comps_layout_App</div>
// 	}
// }

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

 