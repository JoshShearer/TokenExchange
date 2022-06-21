import { RootState, Actions, dispatch } from '#src/models/store';
import { ETHER_ADDRESS } from '../../web3_eth/test/helpers';
//TS Types
import type {
  Exchange as ExCon,
  Order,
} from '../../web3_eth/web3Types/Exchange';
import type { Token as Tokentype } from '../../web3_eth/web3Types/Token';
import { Eth } from 'web3';

import Token from '../../web3_eth/abis/Token.json';
import Exchange from '../../web3_eth/abis/Exchange.json';

import Web3 from 'web3';
import moment from 'moment';

export const web3Loader = async () => {
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    dispatch.models_WebB.loadWeb3Async(web3);
    return web3;
  } else {
    window.alert('Please install MetaMask');
    window.location.assign('https://metamask.io/');
  }
};

//Check for metamask before dispatching the token
export const loadToken = async (web3: Eth, networkId: Number) => {
  try {
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[networkId].address
    );
    dispatch.models_Token.loadTokenAsync(token);
    return token;
  } catch (error) {
    console.log(
      'Token Contract not deployed to the current network. Please select another network with Metamask.'
    );
    return null;
  }
};

export const loadExchange = async (web3: Eth, networkId: Number) => {
  try {
    const exchange = new web3.eth.Contract(
      Exchange.abi,
      Exchange.networks[networkId].address
    );
    dispatch.models_Exchange.loadExchangeAsync(exchange);
    return exchange;
  } catch (error) {
    console.log(
      'Exchange Contract not deployed to the current network. Please select another network with Metamask.'
    );
    return null;
  }
};

export const loadAllOrders = async (exchange: ExCon) => {
  // Fetch cancelled orders with the "Cancel" event stream
  const cancelStream = await exchange.getPastEvents('Cancel', {
    fromBlock: 0,
    toBlock: 'latest',
  });
  // Format cancelled orders
  const cancelledOrders = cancelStream.map((event) => event.returnValues);
  // Add cancelled orders to the redux store
  dispatch.models_Exchange.loadCancelled(cancelledOrders);
  // Fetch filled orders with the "Trade" event stream
  const tradeStream = await exchange.getPastEvents('Trade', {
    fromBlock: 0,
    toBlock: 'latest',
  });
  // Format filled orders
  const filledOrders = tradeStream.map((event) => event.returnValues);
  // Add cancelled orders to the redux store
  dispatch.models_Exchange.loadFilledOrders(filledOrders);
  // Load order stream
  const orderStream = await exchange.getPastEvents('Order', {
    fromBlock: 0,
    toBlock: 'latest',
  });
  // Format order stream
  const allOrders = orderStream.map((event) => event.returnValues);
  // Add open orders to the redux store
  dispatch.models_Exchange.loadAllOrders(allOrders);
}

export const subscribeToEvents = async (exchange: ExCon) => {
  exchange.events.Cancel({}, (error, event) => {
    dispatch.models_Exchange.orderCancelled(event.returnValues);
  });

  exchange.events.Trade({}, (error, event) => {
    dispatch.models_Exchange.orderFilled(event.returnValues);
  });

  exchange.events.Deposit({}, (error, event) => {
    dispatch.models_Exchange.balancesLoading(false);
  });

  exchange.events.Withdraw({}, (error, event) => {
    dispatch.models_Exchange.balancesLoading(false);
  });

  exchange.events.Order({}, (error, event) => {
    dispatch.models_Exchange.orderMade(event.returnValues);
  });
};

export const cancelOrder = (exchange, order, account) => {
  exchange.methods
    .cancelOrder(order.id)
    .send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch.models_Exchange.setCancelling(true);
    })
    .on('error', (error) => {
      console.log(error);
      window.alert('There was an error!');
    });
};

export const fillOrder = (exchange, account, order) => {
  exchange.methods
    .fillOrder(order.id)
    .send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch.models_Exchange.setFilling(true);
    })
    .on('error', (error) => {
      console.log(error);
      window.alert('There was an error!');
    });
};

export const loadBalances = async (web3, exchange, token, account) => {
  if (typeof account !== 'undefined') {
    // Ether balance in wallet
    const etherBalance = await web3.eth.getBalance(account);
    dispatch.models_WebB.loadBal(etherBalance);

    // Token balance in wallet
    const tokenBalance = await token.methods.balanceOf(account).call();
    dispatch.models_Token.loadBal(tokenBalance);

    // Ether balance in exchange
    const exchangeEtherBalance = await exchange.methods
      .balanceOf(ETHER_ADDRESS, account)
      .call();
    dispatch.models_Exchange.loadExEthBal(exchangeEtherBalance);

    // Token balance in exchange
    const exchangeTokenBalance = await exchange.methods
      .balanceOf(token.options.address, account)
      .call();
    dispatch.models_Exchange.loadExTokBal(exchangeTokenBalance);

    // Trigger all balances loaded
    dispatch.models_Exchange.balancesLoaded();
  } else {
    window.alert('Please login with MetaMask');
  }
};

export const depositEther = (exchange, web3, amount, account) => {
  exchange.methods
    .depositEther()
    .send({ from: account, value: web3.utils.toWei(amount, 'ether') })
    .on('transactionHash', (hash) => {
      dispatch.models_Exchange.balancesLoading();
    })
    .on('error', (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const withdrawEther = (exchange, web3, amount, account) => {
  exchange.methods
    .withdrawEther(web3.utils.toWei(amount, 'ether'))
    .send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch.models_Exchange.balancesLoading();
    })
    .on('error', (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const depositToken = (exchange, web3, token, amount, account) => {
  amount = web3.utils.toWei(amount, 'ether');

  token.methods
    .approve(exchange.options.address, amount)
    .send({ from: account })
    .on('transactionHash', (hash) => {
      exchange.methods
        .depositToken(token.options.address, amount)
        .send({ from: account })
        .on('transactionHash', (hash) => {
          dispatch.models_Exchange.balancesLoaded();
        })
        .on('error', (error) => {
          console.error(error);
          window.alert(`There was an error!`);
        });
    });
};

export const withdrawToken = (exchange, web3, token, amount, account) => {
  exchange.methods
    .withdrawToken(token.options.address, web3.utils.toWei(amount, 'ether'))
    .send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch.models_Exchange.balancesLoading();
    })
    .on('error', (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const makeBuyOrder = (exchange, token, web3, order, account) => {
  const tokenGet = token.options.address;
  const amountGet = web3.utils.toWei(order.amount, 'ether');
  const tokenGive = ETHER_ADDRESS;
  const amountGive = web3.utils.toWei(
    (order.amount * order.price).toString(),
    'ether'
  );

  exchange.methods
    .makeOrder(tokenGet, amountGet, tokenGive, amountGive)
    .send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch.models_Exchange.buyOrderMaking();
    })
    .on('error', (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const makeSellOrder = (exchange, token, web3, order, account) => {
  const tokenGet = ETHER_ADDRESS;
  const amountGet = web3.utils.toWei(
    (order.amount * order.price).toString(),
    'ether'
  );
  const tokenGive = token.options.address;
  const amountGive = web3.utils.toWei(order.amount, 'ether');

  exchange.methods
    .makeOrder(tokenGet, amountGet, tokenGive, amountGive)
    .send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch.models_Exchange.sellOrderMaking();
    })
    .on('error', (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};
