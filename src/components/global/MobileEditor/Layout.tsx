import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';
import { a, Interpolation, SpringValue } from 'react-spring';

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind: (...args: any[]) => ReactDOMAttributes;
  display: Interpolation<number, 'block' | 'none'>;
  pageContents: React.ReactNode;
  shareTab: React.ReactNode;
  sheetContents: React.ReactNode;
  y: SpringValue<number>;
}

const Layout: React.FC<Props> = ({
  bind,
  display,
  pageContents,
  shareTab,
  sheetContents,
  y,
}) => (
  <div>
    {pageContents}
    {shareTab}
    <a.div
      className="
        fixed inset-0
        left-[1vw] z-10 mt-8 h-[calc(100vh_+_100px)] 
        w-[98vw]
        touch-none
        rounded-t-2xl bg-neutral-100 p-4
        pb-28 shadow-inner
        dark:bg-[#0f0f0f]
      "
      style={{ display, y }}
      {...bind()}
    >
      {sheetContents}
    </a.div>
  </div>
);

export default Layout;

export const MobileEditorLayout = Layout;
