import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';
import { a, Interpolation, SpringValue } from 'react-spring';

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind: (...args: any[]) => ReactDOMAttributes;
  children: React.ReactNode;
  display: Interpolation<number, 'block' | 'none'>;
  y: SpringValue<number>;
}

const MobileSheet: React.FC<Props> = ({ bind, children, display, y }) => {
  return (
    <a.div
      className={`
        fixed inset-0
        left-[1vw] z-10 mt-8 h-[calc(100vh_+_100px)] 
        w-[98vw]
        touch-none
        rounded-t-2xl bg-neutral-100 p-4
       pb-28 shadow-inner
        dark:bg-[#0f0f0f]
      `}
      style={{ display, y }}
      {...bind()}
    >
      {children}
    </a.div>
  );
};

export default MobileSheet;
