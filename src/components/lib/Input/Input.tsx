import { ChangeEventHandler } from "react";
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
  }
  const onMouseLeave = () => {
    animatebuttonStyle.start({scale: 1.0});
  }
  return (
    <>
      {label ? <label className="text-neutral-400">{label}</label> : null}
      <a.input
        onMouseEnter={() => onMouseOver()}
        onMouseLeave={() => onMouseLeave()}
        style={{ ...buttonStyle }}
        className={`
          ${className}
          dark:bg-neutral-900
          rounded-lg
          mb-4
          shadow-lg
          outline-offset-2
          focus-within:outline focus-within:outline-rose-200
          p-4  outline-2 w-full h-12 
          text-lg text-neutral-900 dark:text-white placeholder:dark:text-neutral-600
          flex justify-between
        `}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </>
   
  );
}

export default Input;