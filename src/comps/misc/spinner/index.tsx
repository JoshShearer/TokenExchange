import React from 'react';

const defaultProps = {
  type: '',
} as {
  type?: string;
};

export const Comps_misc_Spinner = (_props: typeof defaultProps) => {
  const props = { ...defaultProps, ..._props };

  if(props.type === 'table') {
    return(<tbody className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white"></tbody>)
  } else {
    return(<div className="flex justify-center items-center">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span className="visually-hidden text-white">...Loading</span>
    </div>
  </div>)
  }
};