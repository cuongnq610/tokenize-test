import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 * This effect is only triggered one time on the first render
 */
export const useEffectOnce = (cb: EffectCallback, deps: DependencyList) => {
  const isFristRenderRef = useRef<boolean>(true);

  useEffect(() => {
    if (isFristRenderRef.current) {
      isFristRenderRef.current = false;
      return cb();
    }
  }, [deps]);
};
