import { useRef, useState } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { useDrag, Vector2 } from '@use-gesture/react';
import clamp from 'lodash.clamp';
import { isIntentionalXAxisGesture } from '../../../server/utils/directions';
// import '../../../styles/globals.css';

export interface Props {
  children: React.ReactNode[];
}

export const isPageOffScreen = (i: number, index: { current: number }) =>
  i < index.current - 1 || i > index.current + 1;

export const HorizontalSwipe: React.FC<Props> = ({ children }) => {
  const index = useRef(0);
  const width = window.innerWidth;
  const [focusedIndex, setFocusedIndex] = useState(0);

  const [props, api] = useSprings(children.length, (pageIndex: number) => ({
    x: pageIndex * width,
    scale: 1,
    display: 'block',
  }));

  const bind = useDrag(
    ({ active, movement: [mx, my], direction: [xDir], cancel }) => {
      if (!isIntentionalXAxisGesture(mx, my)) {
        return;
      }
      const swipelengthThresholdToMoveCard = width / 3;
      if (active && Math.abs(mx) > swipelengthThresholdToMoveCard) {
        index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          children.length - 1
        );
        cancel();
      }
      api.start((i) => {
        if (isPageOffScreen(i, index)) {
          return { display: 'none' };
        }
        const x = (i - index.current) * width + (active ? mx : 0);
        const scale = active ? 1 - Math.abs(mx) / width / 2 : 1;
        setFocusedIndex(index.current);
        return { x, scale, display: 'block' };
      });
    },
    {
      filterTaps: true,
      rubberband: true,
      threshold: [0, 100] as Vector2,
    }
  );

  return (
    <div className="flex h-full flex-col  p-3">
      <div className=" h-full  basis-4/5">
        {props.map(({ x, display, scale }, i) => (
          <animated.div
            {...bind()}
            key={i}
            className="
              page
              absolute 
              left-0
              right-0 h-[90%]  touch-none
            "
            style={{ display, x }}
          >
            <animated.div
              className="
                h-full w-full
                touch-none bg-cover bg-no-repeat
              "
              style={{ scale }}
            >
              {children[i]}
            </animated.div>
          </animated.div>
        ))}
      </div>
      <div className="align-items z-50  flex h-8 w-full basis-1/5 justify-center">
        {children.map((_, currentPageIndex) => (
          <div
            key={currentPageIndex}
            className={`
              ${
                currentPageIndex === focusedIndex
                  ? 'bg-neutral-200 '
                  : 'bg-neutral-500'
              }   mx-1 
                h-3 
                w-3
                rounded-full
                ${index?.current}
            `}
            onClick={() => setFocusedIndex(currentPageIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalSwipe;
