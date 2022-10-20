import FloatingButton from "../../../lib/FloatingButton/FloatingButton";
import { MouseEventHandler } from "react";

export interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SettingsButton: React.FC<Props> = ({
  onClick
}) => {
  return (
    <FloatingButton
      backgroundColor="bg-red-300"
      locationOnScreen="bottom-0 left-0"
      onClick={(e) => onClick(e)}
    >
      <div className="p-2 text-3xl leading-none">⚙️</div>
    </FloatingButton>
  );
};

export default SettingsButton;
