import { config, useSpring, SpringValue } from '@react-spring/web'
import { useState } from "react";

export interface Props {
  initialHeight?: number;
  isLastRowInList: boolean;
  onClick: () => void;
}

export const ROW_HEIGHT = 60;
export const ROW_HEIGHT_WITH_UNIT = 'h-[60px]'; // tailwind may be finicky about string templated values?

export const useDisappearRow = ({
  initialHeight = ROW_HEIGHT,
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

