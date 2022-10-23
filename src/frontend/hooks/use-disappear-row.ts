import { useSpring } from '@react-spring/web'
import { useRef, useState } from "react";

export const useDisappearRow = ({
  isLastRowInList,
  onClick,
}: {
  isLastRowInList: boolean;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isBreakVisible, setIsBreakVisible] = useState(!isLastRowInList);
  const [style, animate] = useSpring(() => ({
    height: "50px",
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
    ref,
    isBreakVisible,
    style,
    toggleRowVisibility,
  }
}

