import { useSpring, SpringValue } from '@react-spring/web'
import { useRef, useState } from "react";

export interface Props {
  frequency?: number;
  isLastRowInList: boolean;
  onClick: () => void;
}

export const useDisappearRow = ({ frequency =  0.1, isLastRowInList, onClick }: Props): {
  isBreakVisible: boolean;
  style: { height: SpringValue<string>; };
  toggleRowVisibility: () => void;
} => {
  const [isBreakVisible, setIsBreakVisible] = useState(!isLastRowInList);
  const [style, animate] = useSpring(() => ({
    height: "50px",
    config: {
      frequency,
    },
    onRest: () => {
      onClick();
    }
  }), []);

  const toggleRowVisibility = () => {
    setIsBreakVisible(false);
    animate.start({
      height: "0px",
    });
  };

  return {
    isBreakVisible,
    style,
    toggleRowVisibility,
  }
}

