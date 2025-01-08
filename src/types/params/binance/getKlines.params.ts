import { Binance_Interval } from "@/types/binance";

export type Binance_GetKLine_Params = {
  symbol: string;
  interval: Binance_Interval;
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
};
