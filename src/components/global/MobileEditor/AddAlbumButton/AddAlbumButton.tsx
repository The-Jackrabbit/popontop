import FloatingButton from "../../../lib/FloatingButton/FloatingButton";
import { MouseEventHandler } from "react";

export interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const AddAlbumButton: React.FC<Props> = ({ onClick }) =>  (
  <FloatingButton 
    isAbsolute={false}
    backgroundColor="hover:bg-green-200 active:bg-green-200"
    locationOnScreen="bottom-0 right-0"
    onClick={(e) => onClick(e)}
  >
    ➕
  </FloatingButton>
);


export default AddAlbumButton;
