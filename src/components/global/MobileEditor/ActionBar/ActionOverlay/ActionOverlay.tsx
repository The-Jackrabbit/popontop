import { useState } from "react";
import { useSpring, animated } from "react-spring";
import ClickCircle from "./ClickCircle/ClickCircle";

export interface Props {
  onExit: (a: any) => void;
  saveChart: () => Promise<string>;
  isLoading: boolean;
}

export const ActionOverlay: React.FC<Props> = ({
  onExit,
  isLoading,
  saveChart,
}) => (
  <div
    className="
      bg-[rgba(100,100,100,_0.0)]]
      bg-gradient-to-b
      from-[rgba(23,23,23,0)]
      to-[rgba(23,23,23,1)]
      h-screen 
      flex items-end justify-center
      z-50
    "
    onClick={onExit}
  >
    <ClickCircle isLoading={isLoading} saveChart={saveChart} />
  </div>
);


export default ActionOverlay;
