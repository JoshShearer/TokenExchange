import React from 'react';

import { Comps_misc_placeholder } from '#src/Comps';

// import { createStructureSelector } from '#src/selectors/util'
// import { userSelector } from '#src/stores/hooks';

const defaultProps = {
  type: '',
} as {
  type?: string;
};

// const selector = createStructuredSelector({
//    item: (root) => root.stores,
// })

export const comps_misc_spinner = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };
  // const selected = useSelector((state) => selector(state, props));

  if(props.type === 'table') {
    return(<tbody className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></tbody>)
  } else {
    return(<div className="flex justify-center items-center">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>)
  }
};
