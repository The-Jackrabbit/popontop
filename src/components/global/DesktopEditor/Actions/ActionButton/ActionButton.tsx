import { a, config, useSpring } from 'react-spring';

export interface Props {
  onClick: () => void;
  text: string;
  variant?: 'primary' | 'regular';
}

export const ActionButton: React.FC<Props> = ({
  onClick,
  text,
  variant = 'regular'
}) => {
  const [buttonStyle, animatebuttonStyle] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      ...config.wobbly,
      bounce: 1.2
    },
  }));
  const onMouseOver = () => animatebuttonStyle.start({scale: 1.1});
  const onMouseLeave = () => animatebuttonStyle.start({scale: 1.0});
  return (
    <div className="m-4 flex-grow-0">
      <a.button
        onMouseEnter={() => onMouseOver()}
        onMouseLeave={() => onMouseLeave()}
        style={{ ...buttonStyle }}
        className={`
          shadow-sm rounded-lg
          dark:shadow-neutral-700
          w-12 h-12
          text-2xl
          leading-none
          outline-2 outline-rose-200
          focus-within:outline  dark:text-neutral-50 
          text-neutral-600
          ${variant === 'primary'
            ? 'bg-rose-400 active:bg-rose-500 '
            : 'bg-white dark:bg-black active:bg-neutral-200 dark:active:bg-neutral-700'
          }
        `}
        onClick={(e) => onClick(e)}
      >
        {text}
      </a.button>
    </div>
  );
}

export default ActionButton;