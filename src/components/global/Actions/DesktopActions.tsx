
import styles from './DesktopActions.module.css'

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
        <ActionButton
          onClick={console.log}
          text="c"
        />
      </div>
    </div>
  );
};

export default DesktopActions;
