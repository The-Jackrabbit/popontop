import type { NextPage } from "next";
import { useState } from "react";

export interface Props {
  backgroundColor: string;
  children?: React.ReactNode;
  locationOnScreen?: string;
  onClick: () => void;
}

const FloatingButton: React.FC<Props> = ({
  backgroundColor,
  children,
  locationOnScreen = ' bottom-0 left-0',
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick()}
      className={backgroundColor + " " + locationOnScreen + "  rounded-full fixed m-4"}
    >
      {children}
    </div>
  );
};

export default FloatingButton;
