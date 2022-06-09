import { RootState, Actions, dispatch } from '#src/models/store';
import {
  ETHER_ADDRESS,
  GREEN,
  RED,
  ether,
  formatBalance,
  tokens,
} from '../../web3_eth/test/helpers';
import { groupBy, maxBy, minBy } from 'lodash';
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
      dispatch.models_Exchange.orderCancelling();
    })
    .on('error', (error) => {
      console.log(error);
      window.alert('There was an error!');
    });
};

export const buildGraphData = (orders) => {
  // Group the orders by hour for the graph
  orders = groupBy(orders, (o) =>
    moment.unix(o.timestamp).startOf('hour').format()
  );
  // Get each hour where data exists
  const hours = Object.keys(orders);
  // Build the graph series
  const graphData = hours.map((hour) => {
    // Fetch all the orders from current hour
    const group = orders[hour];
    // Calculate price values - open, high, low, close
    const open = group[0]; // first order
    const high = maxBy(group, 'tokenPrice'); // high price
    const low = minBy(group, 'tokenPrice'); // low price
    const close = group[group.length - 1]; // last order

    return {
      x: new Date(hour),
      y: [open.tokenPrice, high.tokenPrice, low.tokenPrice, close.tokenPrice],
    };
  });

  return graphData;
};

export const fillOrder = (exchange, order, account) => {
  exchange.methods
    .fillOrder(order.id)
    .send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch.models_Exchange.orderFilling();
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
    dispatch.models_Exchange.ethBalanceLoaded(etherBalance);

    // Token balance in wallet
    const tokenBalance = await token.methods.balanceOf(account).call();
    dispatch.models_Exchange.tokenBalanceLoaded(tokenBalance);

    // Ether balance in exchange
    const exchangeEtherBalance = await exchange.methods
      .balanceOf(ETHER_ADDRESS, account)
      .call();
    dispatch.models_Exchange.exchangeEtherBalanceLoaded(exchangeEtherBalance);

    // Token balance in exchange
    const exchangeTokenBalance = await exchange.methods
      .balanceOf(token.options.address, account)
      .call();
    dispatch.models_Exchange.exchangeTokenBalanceLoaded(exchangeTokenBalance);

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
      dispatch.models_Exchange.balancesLoading(true);
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
      dispatch.models_Exchange.balancesLoading(true);
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
          dispatch.models_Exchange.balancesLoading(false);
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
      dispatch.models_Exchange.balancesLoading(false);
    })
    .on('error', (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const makeBuyOrder = (exchange, web3, token, order, account) => {
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
      dispatch.models_Exchange.buyOrderMaking(false);
    })
    .on('error', (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const makeSellOrder = (order, account) => {
  exchange = dispatch.models_Exchange.Exchange;
  token = dispatch.models_Token.Token;
  web3 = dispatch.models_WebB.Web3Conn;
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

//Prepare various orders for component displays
export const decorateFilledOrders = (orders: Array<Order>) => {
  // Track previous order to compare history
  let previousOrder = orders[0];
  return orders.map((order) => {
    order = decorateOrder(order);
    order = decorateFilledOrder(order, previousOrder);
    previousOrder = order; // Update the previous order once it's decorated
    return order;
  });
};

export const decorateOrder = (order: Order) => {
  let etherAmount;
  let tokenAmount;

  if (order.tokenGive === ETHER_ADDRESS) {
    etherAmount = order.amountGive;
    tokenAmount = order.amountGet;
  } else {
    etherAmount = order.amountGet;
    tokenAmount = order.amountGive;
  }

  // Calculate token price to 5 decimal places
  const precision = 100000;
  let tokenPrice = etherAmount / tokenAmount;
  tokenPrice = Math.round(tokenPrice * precision) / precision;

  return {
    ...order,
    etherAmount: ether(etherAmount),
    tokenAmount: tokens(tokenAmount),
    tokenPrice,
    formattedTimestamp: moment.unix(order.timestamp).format('h:mm:ss a M/D'),
  };
};

const decorateFilledOrder = (order: Order, previousOrder: Order) => {
  return {
    ...order,
    tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, previousOrder),
  };
};
const tokenPriceClass = (
  tokenPrice: Number,
  orderId: String,
  previousOrder: Order
) => {
  // Show green price if only one order exists
  if (previousOrder.id === orderId) {
    return GREEN;
  }

  // Show green price if order price higher than previous order
  // Show red price if order price lower than previous order
  if (previousOrder.tokenPrice <= tokenPrice) {
    return GREEN; // success
  } else {
    return RED; // danger
  }
};

export const decorateMyFilledOrders = (
  orders: Array<Order>,
  account: String
) => {
  return orders.map((order) => {
    order = decorateOrder(order);
    order = decorateMyFilledOrder(order, account);
    return order;
  });
};

const decorateMyFilledOrder = (order: Array<Order>, account: String) => {
  const myOrder = order.user === account;

  let orderType;
  if (myOrder) {
    orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';
  } else {
    orderType = order.tokenGive === ETHER_ADDRESS ? 'sell' : 'buy';
  }

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === 'buy' ? GREEN : RED,
    orderSign: orderType === 'buy' ? '+' : '-',
  };
};

export const decorateMyOpenOrders = (orders: Array<Order>, account: String) => {
  return orders.map((order: Order) => {
    order = decorateOrder(order);
    order = decorateMyOpenOrder(order, account);
    return order;
  });
};

const decorateMyOpenOrder = (order: Array<Order>, account: String) => {
  let orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === 'buy' ? GREEN : RED,
  };
};

export const decorateOrderBookOrders = (orders: Array<Order>) => {
  return orders.map((order) => {
    order = decorateOrder(order);
    order = decorateOrderBookOrder(order);
    return order;
  });
};

const decorateOrderBookOrder = (order: Order) => {
  const orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell';
  return {
    ...order,
    orderType,
    orderTypeClass: orderType === 'buy' ? GREEN : RED,
    orderFillAction: orderType === 'buy' ? 'sell' : 'buy',
  };
};
