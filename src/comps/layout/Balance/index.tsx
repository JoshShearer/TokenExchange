import React from 'react';
import { Tab } from '@headlessui/react';
import Spinner from '#src/comps/misc/spinner';

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

export const comps_layout_Balance = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };
  // const selected = useSelector((state) => selector(state, props));

  return (
    <div className="comps_layout_Balance">
      <Comps_misc_placeholder>
        <p>comps_layout_Balance</p>
      </Comps_misc_placeholder>
    </div>
  );
};

// class comps_layout_Balance extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = this.props
// 		return <div>comps_layout_Balance</div>
// 	}
// }

// const mapState = (state: RootState) => ({
// 	countState: state.count,
// })
 
// const mapDispatch = (dispatch: Dispatch) => ({
// 	count: dispatch.count,
// })
 
// type StateProps = ReturnType<typeof mapState>
// type DispatchProps = ReturnType<typeof mapDispatch>
// type Props = StateProps & DispatchProps
 
// export default connect(mapState, mapDispatch)(comps_layout_Balance)