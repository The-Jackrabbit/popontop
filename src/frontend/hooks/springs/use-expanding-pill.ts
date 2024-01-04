import { SpringValue, useSpring } from 'react-spring';
import { usePageFadeIn } from './use-page-fade-in';
import { useEffect, useState } from 'react';

export interface ExpandingPillHookState {
  borderRadiusStyle: {
    borderRadius: SpringValue<string>;
  };
  opacityAnimationStyle: { opacity: SpringValue<number> };
  pillContentStyle: {
    height: SpringValue<string>;
    padding: SpringValue<string>;
  };
  togglePill: (isActive: boolean) => void;
}

const styles = {
  borderRadius: {
    from: '12px',
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
  padding: {
    from: '0rem 0.5rem',
    to: '0.5rem 0.5rem',
  },
};

export function useExpandingPill({
  height,
  isOpenByDefault = false,
  onExpand = () => undefined,
  onMinimize = () => undefined,
}: {
  height?: string;
  isOpenByDefault?: boolean;
  onExpand?: () => void;
  onMinimize?: () => void;
}): ExpandingPillHookState {
  const {
    animateFadeIn,
    animateFadeOut,
    pageOpacity: opacityAnimationStyle,
  } = usePageFadeIn();
  const maxHeight = height ? height : styles.height.to;
  const [isVisible, setIsVisible] = useState(isOpenByDefault);
  const [borderRadiusStyle, animateBorderRadius] = useSpring(
    () => ({
      borderRadius: !isVisible ? maxHeight : styles.borderRadius.from,
    }),
    []
  );
  const [pillContentStyle, animateRowHeight] = useSpring(
    () => ({
      height: isVisible ? maxHeight : styles.height.from,
      padding: isVisible ? maxHeight : styles.padding.from,
    }),
    []
  );

  const expandPill = () => {
    setIsVisible(!isVisible);
    animateBorderRadius.start({ borderRadius: styles.borderRadius.from });
    animateRowHeight.start({
      config: styles.config,
      height: maxHeight,
      padding: styles.padding.to,
    });
  };

  const minimizePill = () => {
    setIsVisible((isVisible) => !isVisible);
    animateBorderRadius.start({ borderRadius: styles.borderRadius.to });
    animateRowHeight.start({
      config: styles.config,
      padding: styles.padding.from,
      height: styles.height.from,
    });
  };

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

  useEffect(() => {
    if (isOpenByDefault) {
      expandPill();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    borderRadiusStyle,
    opacityAnimationStyle,
    pillContentStyle,
    togglePill: onClickHeader,
  };
}
