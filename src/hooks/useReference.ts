import { useRef, useEffect } from "react";

function useReference<Tstate>(state: Tstate) {
  const ref = useRef(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return {
    ref,
  };
}

export default useReference;
