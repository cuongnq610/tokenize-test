import { createContext } from "react";

import { Binance_Interval, Binance_Kline } from "@/types/binance";

export type TradingViewContextType = {
  interval: Binance_Interval;
  symbol: string;
  setInterval: (interval: Binance_Interval) => void;
  setSymbol: (symbol: string) => void;
  storeData: (data: Binance_Kline[]) => void;
  getCurrentData: () => Binance_Kline[];
};

export const TradingViewContext = createContext<TradingViewContextType>({
  interval: "1m",
  symbol: "BTCUSDT",
  setInterval: () => {},
  setSymbol: () => {},
  storeData: () => {},
  getCurrentData: () => [],
});
