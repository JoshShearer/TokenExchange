import React, { Fragment } from 'react';
import { RootState } from '#src/models/store'
import { connect } from 'react-redux';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
// import useSelector from 'reselect';

// import { createStructureSelector } from '#src/models/util'
// import { userSelector } from '#src/models/hooks';


// import { RootState, Actions, dispatch, store } from '#src/models/store'


const defaultProps = {
  key: 'default',
  name: '',
} as {
  name: string;
  key?: string;
  children?: JSX.Element;
};

// const selector = createStructuredSelector({
//    item: (root) => root.stores,
// })

export const Comps_layout_Navigation_Header = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };
  // const selected = useSelector((state) => selector(state, props));
  
  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)


  return (
    <Disclosure as="nav" className="bg-stone-600">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mb-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 grid grid-cols-3 gap-4">
                  <div className="text-2xl flex-shrink font-bold text-white sm:text-md">
                    MTB DApp Token Exchange
                  </div>
                  <div className="relative flex w-12 h-12 overflow-hidden rounded-full ">
                    <Image
                      objectFit="cover"
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.uPBrGqSV8_52CWr-Oz2_JgHaHa%26pid%3DApi&f=1"
                      alt="CryptoIcon"
                      layout="fill"
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm ">
                        <a
                          className="text-white"
                          href={`https://rinkeby.etherscan.io/address/${props.account}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {props.account}
                        </a>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="joshshearer.org"
                              className={
                                'block px-4 py-2 text-sm text-gray-700'
                              }
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="flex -mr-2 md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon
                      className="block w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <MenuIcon
                      className="block w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-4 pb-3 ">
              <div className="flex items-center px-3">
                <a
                  className="text-white"
                  href={`https://rinkeby.etherscan.io/address/${props.account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.account}
                </a>
              </div>
              <div className="px-2 mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                >
                  Your Profile
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  
};

// export class Comps_Navigation_Header extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = this.props
// 		return <div>Comps_Navigation_Header</div>
// 	}
// }

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

 