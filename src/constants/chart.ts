import { ChartOptions, CrosshairMode, DeepPartial } from "lightweight-charts";

export const DEFAULT_CHART_OPTIONS: DeepPartial<ChartOptions> = {
  handleScale: {
    axisPressedMouseMove: true,
  },
  layout: {
    background: {
      color: "#253248",
    },
    textColor: "rgba(255, 255, 255, 0.9)",
  },
  grid: {
    vertLines: {
      color: "#334158",
    },
    horzLines: {
      color: "#334158",
    },
  },
  crosshair: {
    mode: CrosshairMode.Magnet,
  },
  timeScale: {
    borderColor: "#485c7b",
    timeVisible: true,
    secondsVisible: true,
  },
  width: 1000,
  height: 600,
};
