
import styles from './DesktopActions.module.css'
import ProfileCircle from './ProfileCircle/ProfileCircle';

export interface Props {
  onClick: () => void;
  text: string;
  variant?: 'primary' | 'regular';
}

export const ActionButton: React.FC<Props> = ({
  onClick,
  text,
  variant = 'regular'
}) => (
  <div className="m-4 flex-grow-0">
    <button
      className={`
        w-12
        h-12
        text-xl
        leading-none
        ${styles[variant]}
        ${styles.button}
      `}
      onClick={() => onClick()}
    >
      {text}
    </button>
  </div>
)
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
