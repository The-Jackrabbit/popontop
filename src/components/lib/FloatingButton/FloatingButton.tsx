import { MouseEventHandler } from "react";

export interface Props {
  isAbsolute?: boolean;
  backgroundColor: string;
  children?: React.ReactNode;
  locationOnScreen?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FloatingButton: React.FC<Props> = ({
  isAbsolute = true,
  backgroundColor,
  children,
  locationOnScreen = 'bottom-0 left-0',
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`
      ${backgroundColor}
      ${locationOnScreen} ${isAbsolute ? 'absolute' : ''}
      rounded-full
      p-3 my-3 shadow-lg
      bg-white dark:bg-black
    `}
  >
    <div className="p-1 text-2xl leading-none">{children}</div>
  </button>
);

export default FloatingButton;
