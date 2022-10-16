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
);

export default ActionButton;