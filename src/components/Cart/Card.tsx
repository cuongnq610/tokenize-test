import { PropsWithChildren } from "react";

import classNames from "classnames";

import "./styles.less";

type CardProps = PropsWithChildren & {
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return <div className={classNames("card", className)}>{children}</div>;
};
