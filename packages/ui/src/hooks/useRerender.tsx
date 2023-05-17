import React from 'react';

export const useRerender = () => {
  return React.useReducer(() => ({}), {})[1];
};
