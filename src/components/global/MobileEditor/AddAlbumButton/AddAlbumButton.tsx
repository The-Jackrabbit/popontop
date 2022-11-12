import FloatingButton from "../../../lib/FloatingButton/FloatingButton";
import { MouseEventHandler } from "react";
import { PlusIcon } from '@heroicons/react/24/solid';

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
    <PlusIcon
      className="
        h-6 w-6
        text-neutral-900 dark:text-neutral-50
      "
    />
  </FloatingButton>
);


export default AddAlbumButton;
