import { MouseEventHandler } from "react";

export interface Props {
  backgroundColor: string;
  children?: React.ReactNode;
  locationOnScreen?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FloatingButton: React.FC<Props> = ({
  backgroundColor,
  children,
  locationOnScreen = ' bottom-0 left-0',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={backgroundColor + " " + locationOnScreen + " rounded-full p-3 absolute m-3"}
    >
      {children}
    </button>
  );
};

export default FloatingButton;
