import FloatingButton from "../../../lib/FloatingButton/FloatingButton";

export interface Props {
  onClick: () => void;
}

const SettingsButton: React.FC<Props> = ({
  onClick
}) => {
  return (
    <FloatingButton
      backgroundColor="bg-red-300"
      onClick={() => onClick()}
    >
      <div className="p-4 text-3xl leading-none">⚙️</div>
    </FloatingButton>
  );
};

export default SettingsButton;
