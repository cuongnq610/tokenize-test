declare global {
  type ValueOf<T> = T[keyof T];

  type Nullable<T> = T | null;

  type MaybeAble<T> = T | undefined;

  type Primitive =
    | bigint
    | boolean
    | null
    | number
    | string
    | symbol
    | undefined;
}

export {};
