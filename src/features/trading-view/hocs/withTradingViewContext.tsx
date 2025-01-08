import { ComponentType } from "react";

import { TradingViewProvider } from "../components";

export const withTradingViewContext = <T extends object>(
  Component: ComponentType<T>
) => {
  const WrapperComponent = (props: T) => {
    return (
      <TradingViewProvider>
        <Component {...props} />
      </TradingViewProvider>
    );
  };

  return WrapperComponent
};
