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

export const Comps_layout_Navigation = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };
  // const selected = useSelector((state) => selector(state, props));

  return (
    <div className="Comps_layout_Navigation">
      <Comps_misc_placeholder>
        <p>Comps_layout_Navigation</p>
      </Comps_misc_placeholder>
    </div>
  );
};

// class Comps_layout_Navigation extends React.PureComponent<Props> {
// 	render() {
// 		const { countState } = this.props
// 		return <div>Comps_layout_Navigation</div>
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
 
// export default connect(mapState, mapDispatch)(Comps_layout_Navigation)