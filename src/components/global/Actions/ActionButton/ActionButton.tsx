import styles from '../DesktopActions.module.css'

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
        w-12 h-12
        text-2xl
        leading-none
        outline-2 outline-rose-200
        focus-within:outline 
        active:bg-rose-500 active:text-neutral-50
        ${variant === 'primary' ? 'bg-rose-400 text-neutral-50' : 'bg-neutral-300'}
      `}
      onClick={() => onClick()}
    >
      {text}
    </button>
  </div>
);

export default ActionButton;