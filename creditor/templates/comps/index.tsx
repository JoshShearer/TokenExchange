import React, { useEffect } from 'react';
// import useSelector from 'reselect';

// import { createStructuredSelector } from '#src/models/utils'
// import { useSelector } from '#src/models/hooks';


// import { RootState, Actions, dispatch, store } from '#src/models/store'

import { Comps_misc_placeholder } from '#src/Comps';



const defaultProps = {
  idKey: 'default',
} as {
  idKey?: string;
  children?: JSX.Element;
};
// const selector = createStructuredSelector({
//    item: (root) => root.stores,
// })

export const CREDITOR_UNDERSCORE_NAME = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  
  // useEffect(() => {
    
  // },[]);

  // const selected = useSelector((state) => selector(state, props));

  // const selected = useSelector(
  //   (rootState: RootState) => rootState.model.statevar //capturing state slice (not internal selector)
  // );
  // const selected = useSelector(store.select.model.selectorFunction); //using state and selector (internal selector function)


  return (
    <div className="CREDITOR_UNDERSCORE_NAME">
      <Comps_misc_placeholder>
        <p>CREDITOR_UNDERSCORE_NAME</p>
      </Comps_misc_placeholder>
    </div>
  );
};

// export class CREDITOR_UNDERSCORE_NAME extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = this.props
// 		return <div>CREDITOR_UNDERSCORE_NAME</div>
// 	}
// }

// const selection = store.select((models) => ({
//   total: models.cart.total,
//   eligibleItems: models.cart.wouldGetFreeShipping,
// }));

 