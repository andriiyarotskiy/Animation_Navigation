import {useEffect, useRef} from 'react';

export const numberWithDot = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
