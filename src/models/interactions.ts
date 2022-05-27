import Web3 from 'web3';
import Token from '../../web3_eth/abis/Token.json';
import Exchange from '../../web3_eth/abis/Exchange.json';
import { ETHER_ADDRESS } from '../../web3_eth/test/helpers';
import { Actions } from './store';

export const loadWeb3 = async (Loader: Actions) => {
  if(typeof window.ethereum!=='undefined'){
    const web3 = new Web3(window.ethereum)
    Loader(web3)
    return web3
  } else {
    window.alert('Please install MetaMask')
    window.location.assign("https://metamask.io/")
  }
}
