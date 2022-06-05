import React, { useEffect } from 'react';
import { Tab } from '@headlessui/react'
import { Comps_misc_Spinner } from '#src/Comps/misc/Spinner';

// import useSelector from 'reselect';

// import { createStructureSelector } from '#src/models/utils'
// import { userSelector } from '#src/models/hooks';


import { RootState, Actions, dispatch, store } from '#src/models/store'

const defaultProps = {
  idKey: 'default',
} as {
  idKey?: string;
  children?: JSX.Element;
};
// const selector = createStructuredSelector({
//    item: (root) => root.stores,
// })

export const Comps_layout_Deposits = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  
  useEffect(() => {
    
  },[]);

  const loadBlockchainData = async () => {
    const { dispatch, web3, exchange, token, account } = props
    await loadBalances(dispatch, web3, exchange, token, account)
  }

    return (
      <div>
        {selected.showForm ? showForm(props) : <Comps_misc_Spinner />}
      </div>
    )
  }

  // const selected = useSelector((state) => selector(state, props));

  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)


  


// export class Comps_layout_Orders extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = this.props
// 		return <div>Comps_layout_Orders</div>
// 	}
// }

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const showForm = (props) => {
  const {
    dispatch,
    exchange,
    web3,
    account,
    etherBalance,
    tokenBalance,
    exchangeEtherBalance,
    exchangeTokenBalance,
    etherDepositAmount,
    token,
    tokenDepositAmount,
    etherWithdrawAmount,
    tokenWithdrawAmount,
  } = props

  return (

      <div className="w-full max-w-sm min-w-min mx-auto bg-stone-700 rounded">
        <div className="py-5 sm:p-6">
            <h2 className="text-2xl text-white">Balance</h2>
            <br />
            <Tab.Group
            >
              <Tab.List className="flex p-1 space-x-1 bg-stone-500 rounded-lg">
                <Tab
                  key="Deposit"
                  className={({ selected }) =>
                    classNames(
                      'w-full text-white rounded-lg hover:text-white',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60',
                      selected
                        ? 'bg-stone-800 shadow text-white'
                        : 'text-white hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  Deposit
                </Tab>
                <Tab
                  key="Withdraw"
                  className={({ selected }) =>
                    classNames(
                      'w-full text-white rounded-lg hover:text-white',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60',
                      selected
                        ? 'bg-stone-800 shadow text-white'
                        : 'text-white hover:bg-stone-300/[0.12] hover:text-white'
                    )
                  }
                >
                  Withdraw
                </Tab>

              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <table className='table-auto'>
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                        >
                          Token
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                        >
                          Wallet
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                        >
                          Exchange
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-white">
                          ETH
                        </td>
                        <td className="text-white">
                          {etherBalance}
                        </td>
                        <td className="text-white">
                          {exchangeEtherBalance}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      depositEther(
                        dispatch,
                        exchange,
                        web3,
                        etherDepositAmount,
                        account
                      )
                    }}
                  >
                    <div className="grid grid-cols-5 mt-6 gap-y-6 gap-x-4 sm:grid-cols-12">
                      <div className="col-span-3 sm:col-span-7">
                        <input
                          type="text"
                          name="Deposit"
                          id="Deposit"
                          onChange={(e) =>
                            dispatch(
                              etherDepositAmountChanged(
                                e
                                  .target
                                  .value
                              )
                            )
                          }
                          placeholder=" ETH Amount"
                          className="block h-8 w-full mt-1 bg-stone-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <button
                          type="submit"
                          className="inline-flex px-2 py-2 text-base font-medium text-white bg-stone-800 border border-transparent rounded-md shadow-sm items-right hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Deposit
                        </button>
                      </div>
                    </div>
                  </form>

                  <table className='table-auto'>
                    <thead>
                      <tr>
                        <td className="text-white py-3.5  pr-3 text-left text-sm">
                          MTB
                        </td>
                        <td className="text-white py-3.5 pl-4 pr-3 text-left text-sm">
                          {tokenBalance}
                        </td>
                        <td className="text-white py-3.5 pl-4 pr-3 text-left text-sm">
                          {exchangeTokenBalance}
                        </td>
                      </tr>
                    </thead>
                  </table>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      depositToken(
                        dispatch,
                        exchange,
                        web3,
                        token,
                        tokenDepositAmount,
                        account
                      )
                    }}
                  >
                    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-12">
                      <div className="col-span-3 sm:col-span-7">
                        <input
                          type="text"
                          name="Deposit"
                          id="Deposit"
                          onChange={(e) =>
                            dispatch(
                              tokenDepositAmountChanged(
                                e
                                  .target
                                  .value
                              )
                            )
                          }
                          placeholder=" MTB Amount"
                          className="block h-8 w-full mt-1 bg-stone-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <button
                          type="submit"
                          className="inline-flex px-2 py-2 text-base font-medium text-white bg-stone-800 border border-transparent rounded-md shadow-sm items-right hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Deposit
                        </button>
                      </div>
                    </div>
                  </form>
                </Tab.Panel>
                <Tab.Panel>
                  <table>
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                        >
                          Token
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                        >
                          Wallet
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 md:pl-0"
                        >
                          Exchange
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-white">
                          ETH
                        </td>
                        <td className="text-white">
                          {etherBalance}
                        </td>
                        <td className="text-white">
                          {exchangeEtherBalance}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <form className="row" onSubmit={(event) => {
                    event.preventDefault()
                    withdrawEther(dispatch, exchange, web3, etherWithdrawAmount, account)
                  }}>
                    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-12">
                      <div className="col-span-3 sm:col-span-7">
                        <input
                          type="text"
                          name="Withdraw"
                          id="Withdraw"
                          onChange={(e) =>
                            dispatch(
                              etherWithdrawAmountChanged(
                                e.target
                                  .value
                              )
                            )
                          }
                          placeholder=" ETH Amount"
                          className="block h-8 w-full mt-1 bg-stone-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <button
                          type="submit"
                          className="inline-flex px-2 py-2 text-base font-medium text-white bg-stone-800 border border-transparent rounded-md shadow-sm items-right hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </form>
                  <table className='table-auto'>
                    <tbody>
                      <tr>
                        <td className="text-white py-3.5 pr-3 text-left text-sm">
                          MTB
                        </td>
                        <td className="text-white py-3.5 pl-4 pr-3 text-left text-sm">
                          {tokenBalance}
                        </td>
                        <td className="text-white py-3.5 pl-4 pr-3 text-left text-sm">
                          {exchangeTokenBalance}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <form className="row" onSubmit={(event) => {
                    event.preventDefault()
                    withdrawToken(dispatch, exchange, web3, token, tokenWithdrawAmount, account)
                  }}>
                    <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-12">
                      <div className="col-span-3 sm:col-span-7">
                        <input
                          type="text"
                          name="Withdraw"
                          id="Withdraw"
                          onChange={(e) =>
                            dispatch(
                              tokenWithdrawAmountChanged(
                                e.target
                                  .value
                              )
                            )
                          }
                          placeholder=" MTB Amount"
                          className="block h-8 w-full mt-1 bg-stone-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <button
                          type="submit"
                          className="inline-flex px-2 py-2 text-base font-medium text-white bg-stone-800 border border-transparent rounded-md shadow-sm items-right hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </form>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
  )
}