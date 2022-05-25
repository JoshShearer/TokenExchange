import React from 'react';

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

export const Comps_misc = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };
  // const selected = useSelector((state) => selector(state, props));

  return (
    <div className="Comps_misc">
      <Comps_misc_placeholder>
        <p>Comps_misc</p>
      </Comps_misc_placeholder>
    </div>
  );
};
