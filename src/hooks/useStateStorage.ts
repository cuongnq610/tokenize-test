import { useCallback, useEffect, useState } from "react";

import { StoragePersist } from "@/utils/storage";

/**
 * This hook provide 2 feature:
 * 1. Load data from storage on the first render
 * 2. Store data to storage on every change
 */
export const useStateStorage = <StateType>(
  defaultValue: StateType,
  key: string
) => {
  const [state, setState] = useState<StateType>(defaultValue);

  const handleSetState = useCallback(
    (value: StateType) => {
      setState(value);
      StoragePersist.save(key, value);
    },
    [key]
  );

  useEffect(() => {
    const storedData = StoragePersist.get(key);

    const value = (storedData ?? defaultValue) as StateType;

    handleSetState(value);
  }, [defaultValue, handleSetState, key]);

  return { state, setState: handleSetState };
};
