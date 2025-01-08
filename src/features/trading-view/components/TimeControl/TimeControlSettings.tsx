import { useEffect, useMemo, useRef, useState } from "react";

import {
  CaretDown,
  CaretUp,
  CircleMinus,
  CirclePlus,
} from "@/components/Icons";

import { Binance_Interval } from "@/types/binance";

import { useOutsideAlerter } from "@/hooks";
import { useProtectView } from "@/hooks/useProtectView";

import { IntervalItem } from "./definition";
import { TimeControlSettingsItem } from "./TimeControlSettingsItem";

type TimeControlSettingsProps = {
  intervals: IntervalItem[];
  selectedValue: Binance_Interval;
  onSelectInterval: (item: IntervalItem) => void;
  saveIntervals: (items: IntervalItem[]) => void;
};

export const TimeControlSettings = (props: TimeControlSettingsProps) => {
  const {
    intervals: intervalsProps,
    selectedValue,
    onSelectInterval,
    saveIntervals,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const settingPopupElRef = useRef<HTMLDivElement>(null);

  const [intervals, setIntervals] = useState<IntervalItem[]>(intervalsProps);

  useProtectView(settingPopupElRef);

  useOutsideAlerter({
    ref: settingPopupElRef,
    callback: () => {
      setIsOpen(false);
    },
    ignoreSelectors: ["#toggle-setting-button"],
  });

  useEffect(() => {
    setIntervals(intervalsProps);
  }, [intervalsProps]);

  const { availableList, pinnedList } = useMemo(() => {
    const pinnedList: Array<IntervalItem> = [];
    const availableList: Array<IntervalItem> = [];

    intervals.forEach((item) => {
      if (item.isPinned) {
        pinnedList.push(item);
        return;
      }

      availableList.push(item);
    });

    return { pinnedList, availableList };
  }, [intervals]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const turnOnEdit = () => setIsEdit(true);
  const turnOffEdit = () => setIsEdit(false);

  const handleChangePin = (pinItem: IntervalItem, isPinned: boolean) => {
    setIntervals(
      intervals.map((item) => {
        if (item.value === pinItem.value) {
          return { ...item, isPinned };
        }

        return item;
      })
    );
  };

  const handleSelectInterval = (item: IntervalItem, isPinned: boolean) => {
    if (isEdit) {
      handleChangePin(item, isPinned);
    } else {
      onSelectInterval(item);
    }
  };

  const handleSave = () => {
    turnOffEdit();
    saveIntervals(intervals);
    toggleOpen();
  };

  return (
    <div className="time-settings">
      <div onClick={toggleOpen} id="toggle-setting-button" className="h-6">
        {isOpen ? <CaretUp /> : <CaretDown />}
      </div>
      {isOpen && (
        <div ref={settingPopupElRef} className="time-settings__section">
          <div
            className="time-settings__section-edit-button"
            onClick={isEdit ? handleSave : turnOnEdit}
          >
            {isEdit ? "Save" : "Edit"}
          </div>
          <div className="time-settings__section-label">Pinned</div>
          <div className="time-settings__section-list">
            {pinnedList.map((item) => (
              <TimeControlSettingsItem
                key={item.value}
                data={item}
                active={selectedValue === item.value}
                topRighticon={isEdit ? <CircleMinus className="w-4" /> : null}
                onClick={() => {
                  handleSelectInterval(item, false);
                }}
              />
            ))}
          </div>

          <div className="time-settings__section-devide" />

          <div className="time-settings__section-label">Available</div>
          <div className="time-settings__section-list">
            {availableList.map((item) => (
              <TimeControlSettingsItem
                key={item.value}
                data={item}
                active={selectedValue === item.value}
                topRighticon={isEdit ? <CirclePlus className="w-4" /> : null}
                onClick={() => {
                  handleSelectInterval(item, true);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
