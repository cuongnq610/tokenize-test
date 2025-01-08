import { useMemo } from "react";

import { INTERVALS_SETTINGS_KEY } from "@/constants/storage";

import { useTradingViewContext } from "../../hooks";
import { useStateStorage } from "@/hooks";
import classNames from "classnames";

import { DEFAULT_INTERVALS, IntervalItem } from "./definition";
import { TimeControlSettings } from "./TimeControlSettings";

import "./styles.less";

export const TimeControl = () => {
  const { interval, setInterval } = useTradingViewContext();
  const { state: intervals, setState: setIntervals } = useStateStorage(
    DEFAULT_INTERVALS,
    INTERVALS_SETTINGS_KEY
  );

  const pinnedList = useMemo(() => {
    return intervals.filter((item) => item.isPinned);
  }, [intervals]);

  const handleSelectInterval = (item: IntervalItem) => {
    setInterval(item.value);
  };

  return (
    <div className="time-label-container custom-scrollbar">
      <div className="time-label">Time</div>
      {pinnedList.map((item) => (
        <div
          key={item.value}
          className={classNames("time-item", {
            "time-item__active": item.value === interval,
          })}
          onClick={() => handleSelectInterval(item)}
        >
          {item.value}
        </div>
      ))}
      <TimeControlSettings
        intervals={intervals}
        selectedValue={interval}
        saveIntervals={setIntervals}
        onSelectInterval={handleSelectInterval}
      />
    </div>
  );
};
