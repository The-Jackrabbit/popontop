import { useState } from "react";
import { a, config, useSpring } from 'react-spring';

export interface Option {
  label: string;
  value: string;
}

export interface Props {
  label?: string;
  isMobile?: boolean;
  isOpenByDefault: boolean;
  options: Option[];
  placeholder?: string;
  setChosenValue: (value: string) => void;
  value: string;
}

export const Select: React.FC<Props> = ({
  label = 'Label',
  // isMobile = false,
  isOpenByDefault,
  options = [],
  placeholder = 'Type here',
  setChosenValue,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const [blurLock, setBlurLock] = useState(false);
  const selectedValueLabel = options
    .find((option: Option): boolean => value === option.value)?.label
    const [buttonStyle, animatebuttonStyle] = useSpring(() => ({
      from: { scale: 1 },
      config: {
        bounce: 1.1
      },
    }));
    const onMouseOver = () => {
      animatebuttonStyle.start({scale: isOpen ? 1 : 1.02 });
    }
    const onMouseLeave = () => {
      animatebuttonStyle.start({scale: 1.0});
    }
  return (
    <div
      className="flex flex-col pb-4 relative"
      onAbort={() => console.log}
    >
      <label className="text-neutral-400">{label}</label>
      <a.button
       onMouseEnter={() => onMouseOver()}
       onMouseLeave={() => onMouseLeave()}
       style={{ ...buttonStyle }}
        className={`
        rounded-lg
        shadow-lg
          bg-white dark:bg-neutral-600
          outline-rose-200 text-neutral-400
          focus-within:text-rose-300 
          justify-between flex
          outline-offset-2  outline-2 
          focus-within:outline focus-within:outline-rose-200
          h-12 p-4 w-full mb
          text-lg border-transparent
          z-20
        `}
        onClick={() => {
          animatebuttonStyle.start({scale: 1.0});
          setIsOpen(!isOpen)
        }}
        tabIndex={0}
      >
        <div className="-translate-y-1">
          {value
            ? <p className="text-neutral-800 dark:text-neutral-100   dark:hover:text-white">{selectedValueLabel}</p>
            : <p className="text-neutral-300 dark:text-neutral-400   dark:hover:text-white">{placeholder}</p>
          }
        </div>
        <div className="hover:text-rose-500 flex flex-row">
          <span
            className={`
              ${value ? 'text-rose-300' : ''}
              hover:text-rose-300
              text-neutral-400
              -translate-y-1
            `}
          >
            ▽△
          </span>
        </div>
      </a.button>
      <div
        className={`
          shadow-xl z-50 
          rounded-lg
          mt-2
          bg-white dark:bg-neutral-800
          absolute w-full top-[80px]
          max-h-[144px]
          ${options.length > 3 ? 
            'overflow-y-scroll' : ''}
        `}
      >
        {isOpen && options.map(({ value, label } ) => (
          <button
            key={`${value}${label}`}
            className={`

              outline outline-2 outline-transparent
              border-transparent
              bg-transparent
              focus-within:z-50
              first-of-type:rounded-t-lg  last-of-type:rounded-b-lg
            hover:text-neutral-50  hover:bg-rose-300
              focus-within:bg-rose-200 focus-within:text-neutral-50 focus:border-green-300
              w-full h-12 mb p-4 
              text-left text-lg text-neutral-600 dark:text-neutral-200
            `}
            onPointerDown={() => {
              setBlurLock(true);
            }}
            onClick={() => {
              setChosenValue(value);
              setIsOpen(false);
              setBlurLock(false);
            }}
            tabIndex={0}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Select;