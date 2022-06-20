import contract from '../../../web3_eth/abis/Exchange.json';
import Web3 from 'web3';

import type { Exchange } from '../../../web3_eth/web3Types/Exchange';

let abi = {} as any as Exchange;

export const apis_exchange = () => {
  const api = {
    async init() {
      // @ts-ignore
      const web3 = new Web3(window.ethereum);
      // dispatch.models_WebB.loadWeb3Async(web3); Load account information

      try {
        const networkId = await web3.eth.net.getId();

        abi = new web3.eth.Contract(
          // @ts-ignore
          contract.abi, // @ts-ignore
          contract.networks[networkId].address
        ) as any as Exchange;

        Object.assign(api, abi);
      } catch (error) {
        console.log(
          'Exchange Contract not deployed to the current network. Please select another network with Metamask.'
        );
        return null;
      }
    },
    ...abi,
  };
  type ApiType = typeof api;
  return api as ApiType;
};
