import React from 'react';

const defaultProps = {
  type: '',
} as {
  type?: string;
};

export const Comps_misc_spinner = (_props: typeof defaultProps) => {
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
