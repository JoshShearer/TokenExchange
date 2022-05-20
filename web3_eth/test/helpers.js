export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
export const GREEN = 'green'
export const RED = 'red'
// var BN = web3.utils.BN;
// var WEI = web3.utils.toWei;

export const EVM_REVERT = 'VM Exception while processing transaction: revert'

export const DECIMALS = (10**18)

// Shortcut to avoid passing around web3 connection
export const ether = (wei) => {
  if(wei) {
    return(wei / DECIMALS) // 18 decimal places
  }
}

// Tokens and ether have same decimal resolution
export const tokens = ether
