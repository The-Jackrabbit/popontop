import { XCircleIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, ChangeEventHandler } from "react";
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
      bounce: 1.1
    },
  }));

  const onMouseOver = () => {
    animatebuttonStyle.start({scale: !isMobile ? 1.02 : 1});
  };

  const onMouseLeave = () => {
    animatebuttonStyle.start({scale: 1.0});
  };

  return (
    <>
      {label ? <label className="text-neutral-400">{label}</label> : null}
      <div
        className="
          dark:bg-neutral-900
          rounded-lg
          shadow-lg
          outline-offset-2
          focus-within:outline focus-within:outline-rose-200
          py-2 px-4
          outline-2  h-12 
          text-lg text-neutral-900 dark:text-white placeholder:dark:text-neutral-600
          flex justify-between
          overflow-x-hidden
        "
      >
        <a.input
          onMouseEnter={() => onMouseOver()}
          onMouseLeave={() => onMouseLeave()}
          style={{ ...buttonStyle }}
          className={`
            ${className}
            max-w-[90%]
            bg-transparent
            outline-none
            shrink
          `}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
        <a.button onClick={() => onChange({ target: { value: '' }} as ChangeEvent<HTMLInputElement>)}>
          <XCircleIcon className="text-neutral-300 dark:text-neutral-600 w-4 h-4" />
        </a.button>
      </div>
    </>
  );
}

export default Input;