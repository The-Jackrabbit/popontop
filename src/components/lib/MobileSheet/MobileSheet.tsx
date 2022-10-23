import { a } from "react-spring";

export interface Props {
  bind: any;
  children: React.ReactNode;
  display: any;
  y: any;
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
        overflow-y-scroll
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
