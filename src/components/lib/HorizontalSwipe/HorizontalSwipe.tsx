import { useRef, useState } from 'react'
import { useSprings, animated } from '@react-spring/web'
import { useDrag, Vector2 } from '@use-gesture/react'
import clamp from 'lodash.clamp'
import { isIntentionalXAxisGesture } from '../../../utils/directions';
// import '../../../styles/globals.css';

export interface Props {
  children: React.ReactNode[];
}

export const isPageOffScreen = (i: number, index: { current: number; }) => i < index.current - 1 || i > index.current + 1;

export const HorizontalSwipe: React.FC<Props> = ({ children }) => {
  const index = useRef(0)
  const width = window.innerWidth;
  const [focusedIndex, setFocusedIndex] = useState(0);

  const [props, api] = useSprings(children.length, (pageIndex: number) => ({
    x: pageIndex * width,
    scale: 1,
    display: 'block',
  }));

  const bind = useDrag(({ active, movement: [mx, my], direction: [xDir,], cancel }) => {
    if (!isIntentionalXAxisGesture(mx, my)) {
      return;
    }
    const swipelengthThresholdToMoveCard = width / 3;
    if (active && Math.abs(mx) > swipelengthThresholdToMoveCard) {
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, children.length - 1)
      cancel()
    }
    api.start(i => {
      if (isPageOffScreen(i, index)) {
        return { display: 'none' }
      }
      const x = (i - index.current) * width + (active ? mx : 0)
      const scale = active ? 1 - Math.abs(mx) / width / 2 : 1
      setFocusedIndex(index.current)
      return { x, scale, display: 'block' }
    })
  }, {
    filterTaps: true,
    rubberband: true,
    threshold: [0, 100] as Vector2,
  });

  return (
    <div className="p-3 flex flex-col  h-full">
      <div className=" basis-4/5  h-full" >
        {props.map(({ x, display, scale }, i) => (
          <animated.div
            {...bind()}
            key={i}
            className="
              page
              absolute 
              touch-none
              left-0 right-0  h-[90%]
            "
            style={{ display, x }}
          >
            <animated.div
              className="
                touch-none bg-no-repeat
                h-full w-full bg-cover
              "
              style={{  scale, }}
            >
              {children[i]}
            </animated.div>
          </animated.div>
        ))}
      </div>
      <div className="z-50 basis-1/5  flex justify-center align-items h-8 w-full">
        {children.map((_, currentPageIndex) => (
          <div
            key={currentPageIndex}
            className={`
              ${currentPageIndex === focusedIndex ? 'bg-neutral-200 ' : 'bg-neutral-500'}   rounded-full 
                mx-1 
                h-3
                w-3
                ${index?.current}
            `}
            onClick={() => {
              debugger;
              setFocusedIndex(currentPageIndex)
            }} 
          />
        ))}
      </div>
    </div>
  )
}

export default HorizontalSwipe;
