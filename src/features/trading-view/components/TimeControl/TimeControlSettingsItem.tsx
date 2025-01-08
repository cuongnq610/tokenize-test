import { ReactElement } from "react";

import classNames from "classnames";

import { IntervalItem } from "./definition";

type TimeControlSettingsItemProps = {
  data: IntervalItem;
  active: boolean;
  onClick: () => void;
  topRighticon?: Nullable<ReactElement>;
};

export const TimeControlSettingsItem = ({
  data,
  active,
  topRighticon,
  onClick,
}: TimeControlSettingsItemProps) => {
  return (
    <div
      className={classNames("setting-control-item", {
        active,
      })}
      onClick={onClick}
    >
      {data.value}
      {topRighticon && <div className="top-right">{topRighticon}</div>}
    </div>
  );
};
