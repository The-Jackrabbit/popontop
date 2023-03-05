import { config, useSpring } from 'react-spring';

export const START_SCALE = 1;
export const END_SCALE = 1.01;
export const BOUNCE = 1.2;

export function useZoomOnHover(
  zoomConfig: {
    bounce: number;
    endScale: number;
    startScale: number;
  } = {
    bounce: BOUNCE,
    endScale: END_SCALE,
    startScale: START_SCALE,
  }
) {
  const [zoomOnHoverStyle, animateZoomOnHover] = useSpring(() => ({
    from: { scale: zoomConfig.startScale },
    config: {
      ...config.wobbly,
      bounce: zoomConfig.bounce,
    },
  }));
  const onMouseOver = () =>
    animateZoomOnHover.start({ scale: zoomConfig.endScale });
  const onMouseLeave = () =>
    animateZoomOnHover.start({ scale: zoomConfig.startScale });

  return {
    zoomOnHoverStyle,
    onMouseLeave,
    onMouseOver,
  };
}
