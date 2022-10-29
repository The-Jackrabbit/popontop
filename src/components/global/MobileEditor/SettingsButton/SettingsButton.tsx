import FloatingButton from "../../../lib/FloatingButton/FloatingButton";
import { MouseEventHandler } from "react";

export interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SettingsButton: React.FC<Props> = ({ onClick }) => (
  <FloatingButton
    isAbsolute={false}
    backgroundColor="hover:bg-red-200 active:bg-red-200"
    locationOnScreen="bottom-0 left-0"
    onClick={(e) => onClick(e)}
  >
   ⚙️
  </FloatingButton>
);

export default SettingsButton;
