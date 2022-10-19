import FloatingButton from "../../../lib/FloatingButton/FloatingButton";

export interface Props {
  onClick: () => void;
}

const AddAlbumButton: React.FC<Props> = ({
  onClick
}) => {
  return (
    <FloatingButton 
      backgroundColor="bg-green-300"
      locationOnScreen=" bottom-0 right-0"
      onClick={() => onClick()}
    >
      <div className="p-4 text-3xl leading-none">➕</div>
    </FloatingButton>
  );
};

export default AddAlbumButton;
