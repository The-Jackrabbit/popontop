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
  locationOnScreen = ' bottom-0 left-0',
  onClick,
}) => {
  const absolute = isAbsolute ? 'absolute' : '';
  return (
    <button
      onClick={onClick}
      className={backgroundColor + " " + locationOnScreen + " " + absolute  + " rounded-full p-3  m-3"}
    >
      {children}
    </button>
  );
};

export default FloatingButton;
