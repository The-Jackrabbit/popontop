import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { a, Interpolation, SpringValue } from "react-spring";

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bind: (...args: any[]) => ReactDOMAttributes;
  children: React.ReactNode;
  display: Interpolation<number, "block" | "none">;
  y: SpringValue<number>;
}

const MobileSheet: React.FC<Props> = ({
  bind,
  children,
  display,
  y,
}) => {
  return (
    <a.div
      className={`
        sheet
        w-screen
        z-10 fixed inset-0
        shadow-inner
        mt-8 p-4 pb-28
       bg-neutral-100 dark:bg-neutral-800
        rounded-t-2xl
      `}
      style={{ display, y }}
      {...bind()}
    >
      {children}
    </a.div>
  );
};

export default MobileSheet;
