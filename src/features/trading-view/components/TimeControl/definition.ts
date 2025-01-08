import { BINANCE_INTERVAL } from "@/constants/binance";

import { Binance_Interval } from "@/types/binance";

export type IntervalItem = {
  value: Binance_Interval;
  isPinned: boolean;
};

const DEFAULT_PINNED_INTERVALS: Array<Binance_Interval> = [
  "1m",
  "15m",
  "1h",
  "4h",
  "12h",
  "1d",
  "1w",
];

export const DEFAULT_INTERVALS: Array<IntervalItem> = Object.values(
  BINANCE_INTERVAL
).map((item) => ({
  value: item,
  isPinned: DEFAULT_PINNED_INTERVALS.includes(item),
}));
