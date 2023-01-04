import { useSpring, SpringValue } from '@react-spring/web';
import { useState } from 'react';

export interface Props {
  isInitiallyVisible?: boolean;
  initialWidth?: string;
}

export const useRowSlideInAndOut = ({
  isInitiallyVisible = true,
  initialWidth = '100%',
}: Props): {
  pillContentStyle: {
    height: SpringValue<string>;
    padding: SpringValue<string>;
    width: SpringValue<string>;
  };
  toggleRowVisibility: () => void;
} => {
  const [isVisible, setIsVisible] = useState(isInitiallyVisible);
  const [pillContentStyle, animateRowHeight] = useSpring(
    () => ({
      height: isVisible ? '64px' : '0px',
      padding: isVisible ? '0.5rem 0.5rem' : '0rem 0.5rem',
      width: isVisible ? '100%' : initialWidth,
    }),
    []
  );

  const toggleRowVisibility = () => {
    setIsVisible((isVisible) => !isVisible);
    animateRowHeight.start({
      height: !isVisible ? '64px' : '0px',
      padding: !isVisible ? '0.5rem 0.5rem' : '0rem 0.5rem',
      width: !isVisible ? '100%' : initialWidth,
    });
  };

  return {
    pillContentStyle,
    toggleRowVisibility,
  };
};
