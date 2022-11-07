import { config, SpringValue, useSpring } from 'react-spring';
import { usePageFadeIn } from './use-page-fade-in';
import { useRowSlideInAndOut } from './use-row-slide-in-and-out';
import { useState } from 'react';

export interface ExpandingPillHookState {
  borderRadiusStyle: {
    borderRadius: SpringValue<string>;
  };
  opacityAnimationStyle: { opacity: SpringValue<number>; };
  pillWidthStyle: { paddingRight: SpringValue<number>; };
  rowHeightStyle: {
    height: SpringValue<string>;
    padding: SpringValue<string>;
    width: SpringValue<string>;
  };
  togglePill: (isActive: boolean) => void;
}

export function useExpandingPill({
  onExpand = () => undefined,
  onMinimize = () => undefined,
}: {
  onExpand?: () => void;
  onMinimize?: () => void;
}): ExpandingPillHookState {
  const [pillWidthStyle, animatePillWidthStyle] = useSpring(() => ({
    from: { paddingRight: 8 },
    config: {
      ...config.stiff,
    },
  }));
  const {
    animateFadeIn,
    animateFadeOut,
    pageOpacity: opacityAnimationStyle,
  } = usePageFadeIn();
  const [isVisible, setIsVisible] = useState(false);
  const [borderRadiusStyle, animateBorderRadius] = useSpring(() => ({
    borderRadius: isVisible ? '4px' : '20px',
  }), []);
  const [rowHeightStyle, animateRowHeight] = useSpring(() => ({
    height: isVisible ? '64px' : '0px',
    padding: isVisible ? '0.5rem 0.5rem' : '0rem 0.5rem',
    width: isVisible ? '200px' : '0px',
  }), []);

  const toggleRowVisibility = () => {
    setIsVisible((isVisible) => !isVisible);
    animateBorderRadius.start({
      borderRadius: !isVisible ? '4px' : '20px',
    });
    animateRowHeight.start({
      width: !isVisible ? '200px' : '0px',
      onRest: () => {
        animateRowHeight.start({
          height: !isVisible ? '64px' : '0px',
          padding: !isVisible ?  '0.5rem 0.5rem' : '0rem 0.5rem',
        });
      }
    });
  };

  const expandPill = () => {
    setIsVisible((isVisible) => !isVisible);
    animateBorderRadius.start({ borderRadius: '4px' });
    animateRowHeight.start({
      config: config.stiff,
      onRest: () => animateRowHeight.start({
        height: '64px',
        padding: '0.5rem 0.5rem',
      }),
      width: '200px',
    });
  }

  const minimizePill = () => {
    setIsVisible((isVisible) => !isVisible);
    animateBorderRadius.start({ borderRadius: '20px' });
    animateRowHeight.start({
      height: !isVisible ? '64px' : '0px',
      padding: !isVisible ?  '0.5rem 0.5rem' : '0rem 0.5rem',
      onRest: () => animateRowHeight.start({
        config: config.stiff,
        width: '0px',
      }),
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
    pillWidthStyle,
    rowHeightStyle,
    togglePill: onClickHeader,
  };
}