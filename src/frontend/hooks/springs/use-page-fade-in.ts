import { useSpring } from 'react-spring';

export function usePageFadeIn() {
  const [pageOpacity, animatePageOpacity] = useSpring(() => ({
    from: { opacity: 1 },
  }));

  const animateFadeIn = (onRest?: () => void) =>
    animatePageOpacity.start(() => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: {
        duration: 100,
      },
      onRest,
    }));

  const animateFadeOut = (onRest?: () => void) =>
    animatePageOpacity.start(() => ({
      from: { opacity: 1 },
      to: { opacity: 0 },
      config: {
        duration: 200,
      },
      onRest,
    }));

  return {
    pageOpacity,
    animateFadeIn,
    animateFadeOut,
  };
}
