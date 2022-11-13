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
      from-[rgba(200,200,200,0)]
      via-[rgba(200,200,200,0.2)]
      to-[rgba(200,200,200,1)]
      dark:from-[rgba(23,23,23,0)]
      dark:to-[rgba(23,23,23,1)]
      h-[110vh] w-[100vw] fixed top-0 left-0 
      flex flex-col items-center justify-center
      z-50
    "
    onClick={onExit}
  >
    <div className="basis-1/2">

    </div>
    <div className="basis-1/2">
      <ClickCircle isLoading={isLoading} saveChart={saveChart} />
    </div>
  </div>
);


export default ActionOverlay;
