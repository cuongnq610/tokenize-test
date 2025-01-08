export const debounce = (cb: any, timeout: number) => {
  let timeoutId: Nullable<NodeJS.Timeout>;

  return (...args: unknown[]) => {
    // clear current timeout if it is waiting
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    timeoutId = setTimeout(() => {
      cb(...(args ?? []));
    }, timeout);
  };
};

export const threshold = (cb: any, timeout: number) => {
  let timeoutId: Nullable<NodeJS.Timeout>;

  return (...args: unknown[]) => {
    // clear current timeout if it is waiting
    if (timeoutId) {
      return;
    }

    timeoutId = setTimeout(() => {
      cb(...(args ?? []));
      timeoutId = null;
    }, timeout);
  };
};
