import FloatingButton from "../../../lib/FloatingButton/FloatingButton";
import { MouseEventHandler } from "react";

export interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const AddAlbumButton: React.FC<Props> = ({
  onClick
}) => {
  return (
    <FloatingButton 
      isAbsolute={false}
      backgroundColor="bg-green-300"
      locationOnScreen=" bottom-0 right-0"
      onClick={(e) => onClick(e)}
    >
      <div className="p-2 text-3xl leading-none">➕</div>
    </FloatingButton>
  );
};

export default AddAlbumButton;
