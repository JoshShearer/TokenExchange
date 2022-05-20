# My Crypto Exchange
![CryptoEx](https://user-images.githubusercontent.com/50993714/168156913-b7c8b470-11f5-4328-aede-284727cd8b38.png)

## Overview
A Web 3 Token Exchange built with solidity smart contracts

## Build Stack
 * Nextjs + Typescript
 * Redux/Rematch
 * Solidity
 * TailwindUI
 * Metamask (Dev)
 * Ganache (Dev)

 * Currently hosted on heroku @ [TokenExchange](https://my-crypto-exchange.herokuapp.com/)
 * The components will not load unless Metamask is successfully connected to the page with funded accounts

## Dev Requirements
You will need to have Ganache installed and running in the background.  In the browser Metamask is connected to your ganache ETH accounts.  Truffle also needs to be installed in order to get started.
## Getting Started
Compile the smart contracts:
```bash
truffle migrate
```
Seed the exchange with some trades/transactions:
```bash
truffle web3-eth/scripts/seed-exchange.js
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.




## Components
### Balance
* The balance component will show your balances of ETH as well as the native MTB token created in a local smart contract. Additionally your can deposit and withdraw both tokens.  
### New Order
* You can enter new order requests here with both ETH and MTB tokens.  Buy or sell by selecting the appropriate tab.  
### Order Book
* The order book shows the open order requests.  These are limit orders.  You can take the order by clicking on the row and it will be executed.  
### Price Chart
* This is a candlestick chart of the active trades.
### My Transactions
* A record of trades and open orders.  The open orders can be cancelled by clicking the 'x' associated with the line.
### Trades
* All trades completed on the exchange.