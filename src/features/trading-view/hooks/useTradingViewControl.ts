import { BinanceService } from "@/services/binance.service";

import { Binance_GetKLine_Params } from "@/types/params";

import { useTradingViewContext } from "./useTradingViewContext";

export const useTradingViewControl = () => {
  const { symbol, interval, getCurrentData } = useTradingViewContext();

  const getData = async (params: Binance_GetKLine_Params) => {
    return await BinanceService.getCandles({
      ...params,
    });
  };

  const loadMore = async () => {
    const currData = getCurrentData();

    const olderData = await getData({
      symbol,
      interval,
      endTime: currData[0].closeTime,
    });

    // The last item of olderData is the first item of current data, so need to remove it
    olderData.pop();
    const newData = olderData.concat(currData);

    return newData;
  };

  return {
    getData,
    loadMore,
  };
};
