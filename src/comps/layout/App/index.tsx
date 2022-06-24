import React, { useEffect } from 'react';
import { Comps_layout_Navigation_Header } from '#src/Comps/layout/Navigation/Header';
import { Comps_layout_Navigation_Footer } from '#src/Comps/layout/Navigation/Footer';
import { Comps_layout_MTBApp } from '#src/Comps/layout/MTBApp';

import {
  web3Loader,
  loadToken,
  loadExchange,
} from '#src/models/exchange_methods';

import { createStructuredSelector } from '#src/models/utils';
import { useSelector } from '#src/models/hooks';

const defaultProps = {
  idKey: 'default',
} as {
  idKey?: string;
  children?: JSX.Element;
};

const selector = createStructuredSelector({
  contractsLoaded: (root) =>
    root.models_Exchange.Exchange.loaded && root.models_Token.tokenLoaded,
});

export const Comps_layout_App = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const selected = useSelector((state) => selector(state, props));

  const loadBlockchainData = async () => {
    const web3 = await web3Loader();
    // @ts-ignore
    const networkId = await web3.eth.net.getId();
    const token = await loadToken(web3, networkId);
    if (!token) {
      window.alert(
        'Token smart contract not detected on the current network. Please select another network with Metamask.'
      );
      return;
    }
    const exchange = await loadExchange(web3, networkId);
    if (!exchange) {
      window.alert(
        'Exchange smart contract not detected on the current network. Please select another network with Metamask.'
      );
      return;
    }
  };

  return (
    <div>
      <Comps_layout_Navigation_Header />

      {selected.contractsLoaded ? (
        <Comps_layout_MTBApp />
      ) : (
        <div className="content"></div>
      )}

      <Comps_layout_Navigation_Footer />
    </div>
  );
};
