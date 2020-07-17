import { useEffect, useState } from 'react';

export function useStateTimeout(initialState, timeoutMs) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (state === initialState) {
      // Don't set a timeout when we are at the initial state.
      return;
    }
    const timerId = setTimeout(() => {
      setState(initialState);
    }, timeoutMs);

    return () => {
      clearTimeout(timerId);
    };
  }, [state]);

  return [state, setState];
}
