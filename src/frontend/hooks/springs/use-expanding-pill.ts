import { SpringValue, useSpring } from 'react-spring';
import { usePageFadeIn } from './use-page-fade-in';
import { useState } from 'react';

export interface ExpandingPillHookState {
  borderRadiusStyle: {
    borderRadius: SpringValue<string>;
  };
  opacityAnimationStyle: { opacity: SpringValue<number>; };
  rowHeightStyle: {
    height: SpringValue<string>;
    padding: SpringValue<string>;
    width: SpringValue<string>;
  };
  togglePill: (isActive: boolean) => void;
}

const styles = {
  borderRadius: {
    from: '4px',
    to: '20px',
  },
  config: {
    // ...config.stiff,
    duration: 100,
  },
  height: {
    from: '0px',
    to: '64px',
  },
  width: {
    from: '0px',
    to: '100%',
  },
  padding: {
    from: '0rem 0.5rem',
    to: '0.5rem 0.5rem',
  },
};

export function useExpandingPill({
  onExpand = () => undefined,
  onMinimize = () => undefined,
}: {
  onExpand?: () => void;
  onMinimize?: () => void;
}): ExpandingPillHookState {
  const {
    animateFadeIn,
    animateFadeOut,
    pageOpacity: opacityAnimationStyle,
  } = usePageFadeIn();
  const [isVisible, setIsVisible] = useState(false);
  const [borderRadiusStyle, animateBorderRadius] = useSpring(() => ({
    borderRadius: !isVisible ? styles.borderRadius.to : styles.borderRadius.from,
  }), []);
  const [rowHeightStyle, animateRowHeight] = useSpring(() => ({
    height: isVisible ?  styles.height.to : styles.height.from,
    padding: isVisible ? styles.padding.to  : styles.padding.from,
    width: isVisible ?  styles.width.to : styles.width.from,
  }), []);

  const expandPill = () => {
    setIsVisible((isVisible) => !isVisible);
    animateBorderRadius.start({ borderRadius:  styles.borderRadius.from });
    animateRowHeight.start({
      config: styles.config,
      onRest: () => animateRowHeight.start({
        height: styles.height.to,
        padding: styles.padding.to,
        config: styles.config,
      }),
      width: styles.width.to,
    });
  }

  const minimizePill = () => {
    setIsVisible((isVisible) => !isVisible);
    animateBorderRadius.start({ borderRadius:  styles.borderRadius.to });
    animateRowHeight.start({
      config: styles.config,
      padding: styles.padding.from,
      height: styles.height.from,
      width: styles.width.from,
      // onRest: () => {
        // animateRowHeight.start({});
      // },
    });
  }

  const onClickHeader = (isActive: boolean): void => {
    animateFadeOut(() => {
      if (isActive) {
        onMinimize();
        minimizePill();
      } else {
        onExpand();
        expandPill();
      } 

      animateFadeIn();
    });
  };

  return {
    borderRadiusStyle,
    opacityAnimationStyle,
    rowHeightStyle,
    togglePill: onClickHeader,
  };
}