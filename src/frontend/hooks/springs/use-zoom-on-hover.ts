import { config, useSpring } from 'react-spring';

export function useZoomOnHover() {
  const [zoomOnHoverStyle, animateZoomOnHover] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      ...config.wobbly,
      bounce: 1.2
    },
  }));
  const onMouseOver = () => animateZoomOnHover.start({ scale: 1.1 });
  const onMouseLeave = () => animateZoomOnHover.start({ scale: 1.0 });

  return {
    zoomOnHoverStyle,
    onMouseLeave,
    onMouseOver,
  };
}