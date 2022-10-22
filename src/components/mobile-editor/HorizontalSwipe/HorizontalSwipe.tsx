import { useRef, useState } from 'react'
import { useSprings, animated } from '@react-spring/web'
import { useDrag, Vector2 } from '@use-gesture/react'
import clamp from 'lodash.clamp'
import { isMoreVerticalThanHorizontal } from '../../../utils/directions';
// import '../../../styles/globals.css';

export interface Props {
  children: React.ReactNode[];
}

export const HorizontalSwipe: React.FC<Props> = ({ children }) => {
  const index = useRef(0)
  const width = window.innerWidth;
  const [focusedIndex, setFocusedIndex] = useState(0);

  const [props, api] = useSprings(children.length, (pageIndex: number) => ({
    x: pageIndex * width,
    scale: 1,
    display: 'block',
  }));

  const bind = useDrag(({ active, movement: [mx, my], direction: [xDir, yDir], cancel }) => {
    if (isMoreVerticalThanHorizontal(mx, my)) {
      return;
    }
    if (active && Math.abs(mx) > width / 2) {
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, children.length - 1)
      cancel()
    }
    api.start(i => {
      if (i < index.current - 1 || i > index.current + 1) {
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
    <div style={{  padding: '12px', height: '400px' }}>
      <div className="w-full h-full overflow-hidden" >
        {props.map(({ x, display, scale }, i) => (
          <animated.div  key={i} className="page" {...bind()} style={{ display, x }}>
            <animated.div style={{  scale, }}>
              {children[i]}
            </animated.div>
          </animated.div>
        ))}
      </div>
      <div className="flex justify-center align-items h-8 w-full">
        {children.map((_, currentPageIndex) => (
          <div
            key={currentPageIndex}
            className={`
              ${currentPageIndex === focusedIndex ? 'bg-neutral-200 ' : 'bg-neutral-500'} rounded-full mx-1 h-2 w-2
              ${index?.current}
            `}
          />
        ))}
      </div>
    </div>
  )
}

export default HorizontalSwipe;
