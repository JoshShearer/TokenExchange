import React from 'react';

import { Comps_misc_placeholder } from '#src/Comps';

// import { createStructureSelector } from '#src/selectors/util'
// ipoort { userSelector } from '#src/stors/hooks';

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
