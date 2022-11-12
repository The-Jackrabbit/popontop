import { config, useSpring, SpringValue } from '@react-spring/web'
import { useState } from "react";

export interface Props {
  initialHeight?: number;
  isLastRowInList: boolean;
  onClick: () => void;
}

export const useDisappearRow = ({
  initialHeight = 65,
  isLastRowInList,
  onClick
}: Props): {
  isBreakVisible: boolean;
  style: { height: SpringValue<number>; };
  toggleRowVisibility: () => void;
} => {
  const [isBreakVisible, setIsBreakVisible] = useState(!isLastRowInList);
  const [style, animate] = useSpring(() => ({
    height: initialHeight,
    config: {
      config: config.stiff
    },
    onRest: () => {
      onClick();
    }
  }), []);

  const toggleRowVisibility = () => {
    setIsBreakVisible(false);
    animate.start({ height: 0 });
  };

  return {
    isBreakVisible,
    style,
    toggleRowVisibility,
  }
}

