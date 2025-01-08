import { Binance_GetKLine_Params } from "@/types/params";
import { Binance_GetKLine_Response } from "@/types/responses";

import { binanceAxiosInstance } from "./axios";

const DEFAULT_LIMIT = 1000;

export class BinanceService {
  static async getCandles(params: Binance_GetKLine_Params) {
    const reqParams: Binance_GetKLine_Params = {
      limit: DEFAULT_LIMIT,
      ...params,
    };

    const res = await binanceAxiosInstance.get("/uiKlines", {
      params: reqParams,
    });
    const klines: Binance_GetKLine_Response = res.data.map((item: any[]) => ({
      openTime: item[0],
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
      volume: item[5],
      closeTime: item[6],
      quoteAssetVolume: item[7],
      numberOfTrades: item[8],
      takerBuyBaseAssetVolume: item[9],
      takerBuyQuoteAssetVolume: item[10],
    }));

    return klines;
  }

  static getLiveCandles(params: Binance_GetKLine_Params) {
    const { interval, symbol } = params;
    return (
      "wss://stream.binance.com:9443/ws/" +
      symbol.toLowerCase() +
      "@kline_" +
      interval
    );
  }
}
