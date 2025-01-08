import { useCallback, useEffect, useRef } from "react";

import { BinanceService } from "@/services/binance.service";

import { Card, Chart, ChartForwardedRef } from "@/components";
import { threshold } from "@/utils/function";
import { CandlestickData, UTCTimestamp } from "lightweight-charts";

import { TimeControl } from "./components";
import { withTradingViewContext } from "./hocs";
import { useTradingViewContext, useTradingViewControl } from "./hooks";

import "./styles.less";

export const TradingView = withTradingViewContext(() => {
  const chartRef = useRef<ChartForwardedRef>(null);

  const { interval, symbol, storeData } = useTradingViewContext();

  const { getData, loadMore } = useTradingViewControl();

  const loadingRef = useRef<boolean>(false);

  const streamData = () => {
    const streamURL = BinanceService.getLiveCandles({ interval, symbol });
    const conn = new WebSocket(streamURL);

    conn.onmessage = (event) => {
      const liveData = JSON.parse(event.data);

      const editLiveData: CandlestickData = {
        time: (liveData.k.t / 1000) as UTCTimestamp,
        open: Number(liveData.k.o),
        high: Number(liveData.k.h),
        low: Number(liveData.k.l),
        close: Number(liveData.k.c),
      };

      chartRef.current?.updateData(editLiveData);
    };

    return () => {
      conn.close();
    };
  };

  useEffect(() => {
    return streamData();
  }, [interval, symbol]);

  const initData = useCallback(async () => {
    const _data = await getData({
      interval,
      symbol,
    });

    storeData(_data);

    chartRef.current?.setData(_data);
    chartRef.current?.scrollToPostion("latest");
  }, [interval, symbol]);

  useEffect(() => {
    initData();

    const subscription = chartRef.current?.subscribeLogicalRange();

    return () => subscription && subscription.remove();
  }, [interval, symbol]);

  const handleExceedThreshold = useCallback(async () => {
    // Skip action when data is loading
    if (loadingRef.current) return;

    try {
      loadingRef.current = true;
      const data = await loadMore();
      storeData(data);

      chartRef.current?.setData(data);
    } finally {
      loadingRef.current = false;
    }
  }, [interval, symbol]);

  return (
    <Card className="trading-view__card">
      <TimeControl />
      <Chart
        ref={chartRef}
        className="w-full h-full"
        onExceedThreshold={threshold(handleExceedThreshold, 300)}
      />
    </Card>
  );
});
