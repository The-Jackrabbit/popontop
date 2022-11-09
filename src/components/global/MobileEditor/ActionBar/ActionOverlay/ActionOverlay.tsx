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
}) => {
  return (
    <div
      className="
     
      grow-1 flex content-center justify-center"
      onClick={onExit}
    >
      <div
        className="
          bg-[rgba(100,100,100,_0.0)]]
          from-[rgba(23,23,23,0)] bg-gradient-to-b
          to-[rgba(23,23,23,1)]
          fixed top-0 left-0
          h-screen w-screen 
          grow-1 flex content-center justify-center
          z-40
        "
      >
      
      <ClickCircle isLoading={isLoading} saveChart={saveChart} />

      </div>
      

    </div>
  );
};

export default ActionOverlay;
