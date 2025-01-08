import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { DEFAULT_CHART_OPTIONS } from "@/constants/chart";

import { Binance_Kline } from "@/types/binance";

import { useEffectOnce } from "@/hooks";
import {
  CandlestickData,
  ChartOptions,
  createChart,
  DeepPartial,
  IChartApi,
  ISeriesApi,
  LogicalRange,
  UTCTimestamp,
} from "lightweight-charts";

type ChartProps = {
  onExceedThreshold?: () => void;
  /**
   * Used to determine when to load additional historical data.
   *
   * Ex: When only 400 items remain, more data needs to be loaded to display on the chart
   */
  threshold?: number;
  className?: string;
};

export type ChartForwardedRef = {
  setData: (data: Binance_Kline[]) => void;
  updateData: (data: CandlestickData) => void;
  subscribeLogicalRange: () => MaybeAble<{ remove: () => void }>;
  scrollToPostion: (index: number | "latest") => void;
};

const DEFAULT_THRESHSOLD = 400;

const ChartComponent = forwardRef<ChartForwardedRef, ChartProps>(
  (props, ref) => {
    const {
      threshold = DEFAULT_THRESHSOLD,
      onExceedThreshold,
      className,
    } = props;

    const chartElementRef = useRef<HTMLDivElement>(null);

    const chartRef = useRef<IChartApi>();

    const candleStickRef = useRef<Nullable<ISeriesApi<"Candlestick">>>(null);

    const initChart = (chartOptions?: DeepPartial<ChartOptions>) => {
      // Skip when chart is already created
      if (chartRef.current) return;

      chartRef.current = createChart(chartElementRef.current!, {
        ...DEFAULT_CHART_OPTIONS,
        ...chartOptions,
      });

      candleStickRef.current = chartRef.current.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
    };

    const logicalRangeChangeHandler = useCallback(
      (logicalRange: LogicalRange | null) => {
        if (!logicalRange) return;

        const isExceedThreshold = logicalRange.from <= threshold;

        if (isExceedThreshold) {
          onExceedThreshold?.();
        }
      },
      [onExceedThreshold]
    );

    const subscribeLogicalRange = () => {
      if (!chartRef.current) return;

      const timeScale = chartRef.current.timeScale();

      const remove = () => {
        timeScale.unsubscribeVisibleLogicalRangeChange(
          logicalRangeChangeHandler
        );
      };

      timeScale.subscribeVisibleLogicalRangeChange(logicalRangeChangeHandler);

      return { remove };
    };

    const scrollToPostion = (index: number | "latest") => {
      if (!chartRef.current || !candleStickRef.current) return;

      if (index === "latest") {
        const data = candleStickRef.current.data;
        chartRef.current.timeScale().scrollToPosition(data.length, false);
      } else {
        chartRef.current.timeScale().scrollToPosition(index, false);
      }
    };

    const setData = (data: Binance_Kline[]) => {
      if (!candleStickRef.current) return;

      const candleData: CandlestickData[] = data.map((item) => {
        return {
          close: Number(item.close),
          high: Number(item.high),
          low: Number(item.low),
          open: Number(item.open),
          time: (item.openTime / 1000) as UTCTimestamp,
        };
      });
      candleStickRef.current.setData(candleData);
    };

    const updateData = (candleData: CandlestickData) => {
      if (!candleStickRef.current) return;

      candleStickRef.current.update(candleData);
    };

    useEffectOnce(() => {
      initChart({
        width: chartElementRef.current?.clientWidth,
        height: chartElementRef.current?.clientHeight,
      });
    }, []);

    useEffect(() => {
      const resizeHandler = () => {
        if (chartElementRef.current && chartRef.current) {
          chartRef.current.resize(
            chartElementRef.current?.clientWidth,
            chartElementRef.current.clientHeight
          );
        }
      };

      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, []);

    useImperativeHandle(ref, () => ({
      setData,
      updateData,
      scrollToPostion,
      subscribeLogicalRange,
    }));

    return <div className={className} ref={chartElementRef} />;
  }
);

ChartComponent.displayName = "ChartComponent";

export const Chart = memo(ChartComponent);
