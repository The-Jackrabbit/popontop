import { useSpring, SpringValue } from '@react-spring/web'
import { useRef, useState } from "react";

export interface Props {
  isLastRowInList: boolean;
  onClick: () => void;
}

export const useDisappearRow = ({ isLastRowInList, onClick }: Props): {
  isBreakVisible: boolean;
  style: { height: SpringValue<string>; };
  toggleRowVisibility: () => void;
} => {
  const [isBreakVisible, setIsBreakVisible] = useState(!isLastRowInList);
  const [style, animate] = useSpring(() => ({
    height: "50px",
    config: {
      frequency: 0.1,
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

