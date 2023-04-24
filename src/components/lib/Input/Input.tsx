import { XCircleIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { a, useSpring } from 'react-spring';

export interface Props {
  autofocus?: boolean;
  className?: string;
  isMobile?: boolean;
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
}

export const Input: React.FC<Props> = ({
  className = '',
  isMobile = false,
  label,
  onChange,
  placeholder = 'Type here',
  value = '',
}) => {
  const [buttonStyle, animatebuttonStyle] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      bounce: 1.1,
    },
  }));

  const onMouseOver = () => {
    animatebuttonStyle.start({ scale: !isMobile ? 1.02 : 1 });
  };

  const onMouseLeave = () => {
    animatebuttonStyle.start({ scale: 1.0 });
  };

  return (
    <>
      {label ? <label className="text-neutral-400">{label}</label> : null}
      <div
        className="
          flex
          h-12
          justify-between
          overflow-x-hidden
          rounded-lg py-2
          px-4 text-lg
          text-neutral-900  shadow-lg
          outline-2 outline-offset-2 focus-within:outline focus-within:outline-blue-400
          dark:bg-neutral-900 dark:text-white
          placeholder:dark:text-neutral-600
        "
      >
        <a.input
          onMouseEnter={() => onMouseOver()}
          onMouseLeave={() => onMouseLeave()}
          style={{ ...buttonStyle }}
          className={`
            ${className}
            max-w-[90%]
            shrink
            bg-transparent
            outline-none
          `}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
        <a.button
          onClick={() =>
            onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
          }
        >
          <XCircleIcon className="h-4 w-4 text-neutral-300 dark:text-neutral-600" />
        </a.button>
      </div>
    </>
  );
};

export default Input;
