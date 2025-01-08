import { PropsWithChildren, useCallback, useRef, useState } from "react";

import { CURRENT_INTERVAL_KEY } from "@/constants/storage";

import { Binance_Interval, Binance_Kline } from "@/types/binance";

import { TradingViewContext } from "../contexts";
import { useStateStorage } from "@/hooks/useStateStorage";

type TradingViewProviderProps = PropsWithChildren;

const DEFAULT_INTERVAL: Binance_Interval = "1m";
const DEFAULT_SYMBOL = "BTCUSDT";

export const TradingViewProvider = ({ children }: TradingViewProviderProps) => {
  const { state: interval, setState: setInterval } =
    useStateStorage<Binance_Interval>(DEFAULT_INTERVAL, CURRENT_INTERVAL_KEY);
  const [symbol, setSymbol] = useState<string>(DEFAULT_SYMBOL);

  const dataRef = useRef<Binance_Kline[]>([]);

  const storeData = useCallback((data: Binance_Kline[]) => {
    dataRef.current = data;
  }, []);

  const getCurrentData = useCallback(() => {
    return dataRef.current;
  }, []);

  return (
    <TradingViewContext.Provider
      value={{
        interval,
        symbol,
        setInterval,
        setSymbol,
        storeData,
        getCurrentData,
      }}
    >
      {children}
    </TradingViewContext.Provider>
  );
};
