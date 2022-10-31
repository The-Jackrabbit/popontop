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
  const onMouseOver = () => {
    animatebuttonStyle.start({scale: 1.1});
  }
  const onMouseLeave = () => {
    animatebuttonStyle.start({scale: 1.0});
  }
  return (
    <div className="m-4 flex-grow-0">
      <a.button
        onMouseEnter={() => onMouseOver()}
        onMouseLeave={() => onMouseLeave()}
        style={{ ...buttonStyle }}
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
      </a.button>
    </div>
  );
}

export default ActionButton;