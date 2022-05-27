import React from 'react';
// import { RootState, Dispatch } from '#src/stores/store'
// import { connect } from 'react-redux'
// import { useDispatch } from 'react-redux'

import { Comps_misc_placeholder } from '#src/Comps';

// import { createStructureSelector } from '#src/selectors/util'
// import { userSelector } from '#src/stores/hooks';

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

export const CREDITOR_UNDERSCORE_NAME = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };
  // const selected = useSelector((state) => selector(state, props));

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

// const mapState = (state: RootState) => ({
// 	countState: state.count,
// })
 
// const mapDispatch = (dispatch: Dispatch) => ({
// 	count: dispatch.count,
// })
 
// type StateProps = ReturnType<typeof mapState>
// type DispatchProps = ReturnType<typeof mapDispatch>
// type Props = StateProps & DispatchProps
 
// connect(mapState, mapDispatch, selection)(CREDITOR_UNDERSCORE_NAME)