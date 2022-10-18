
import ActionButton from './ActionButton/ActionButton';
import ProfileCircle from './ProfileCircle/ProfileCircle';

export interface Props {
  onClick: () => void;
  text: string;
  variant?: 'primary' | 'regular';
}

const DesktopActions: React.FC = () => {
  return (
    <div className="border-l-2 h-screen actions-container flex flex-col justify-between">
      <div>
        <ActionButton
          onClick={console.log}
          text="a"
          variant="primary"
        />
        <ActionButton
          onClick={console.log}
          text="⟲"
        />
        <ActionButton
          onClick={console.log}
          text="⟳"
        />
      </div>
      <div>
        <ProfileCircle />     
      </div>
    </div>
  );
};

export default DesktopActions;
