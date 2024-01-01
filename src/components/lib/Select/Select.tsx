import { useState } from 'react';
import { a, useSpring } from 'react-spring';

export interface Option {
  label: string;
  value: string;
}

export interface Props<T> {
  label?: string;
  isMobile?: boolean;
  isOpenByDefault: boolean;
  options: Option[];
  placeholder?: string;
  setChosenValue: (value: T) => void;
  value: string;
}

export const Select = <T extends string>({
  label,
  isOpenByDefault,
  options = [],
  placeholder = 'Type here',
  setChosenValue,
  value,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const selectedValueLabel = options.find(
    (option: Option): boolean => value === option.value
  )?.label;
  const [buttonStyle, animatebuttonStyle] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      bounce: 1.1,
    },
  }));
  const onMouseOver = () =>
    animatebuttonStyle.start({
      scale: isOpen ? 1 : 1.02,
    });
  const onMouseLeave = () => animatebuttonStyle.start({ scale: 1.0 });

  return (
    <div className="relative mt-0 flex w-full flex-col overflow-visible pb-4">
      {label ? <label className="text-neutral-400">{label}</label> : null}
      <a.button
        onMouseEnter={() => onMouseOver()}
        onMouseLeave={() => onMouseLeave()}
        style={{ ...buttonStyle }}
        className={`
          mb
          z-20
          flex h-14
          w-full justify-between
          overflow-visible 
          rounded-lg border-4
          border-transparent   
          bg-white p-4
          pb-6
          text-lg
          text-neutral-400 shadow-lg outline-2 outline-offset-2
          outline-rose-200 focus-within:text-rose-300
          focus-within:outline 
          focus-within:outline-rose-200 dark:border-black
          dark:bg-neutral-900
        `}
        onClick={() => {
          animatebuttonStyle.start({ scale: 1.0 });
          setIsOpen(!isOpen);
        }}
        tabIndex={0}
      >
        <div className="-translate-y-1">
          {value ? (
            <p className="text-neutral-800 dark:text-neutral-100   dark:hover:text-white">
              {selectedValueLabel}
            </p>
          ) : (
            <p className="text-neutral-300 dark:text-neutral-400   dark:hover:text-white">
              {placeholder}
            </p>
          )}
        </div>
        <div className="flex flex-row hover:text-rose-500">
          <span
            className={`
              ${value ? 'text-rose-300' : ''}
              -translate-y-1
              text-neutral-400
              hover:text-rose-300
            `}
          >
            {!isOpen ? '▽' : '△'}
          </span>
        </div>
      </a.button>
      <div
        id="dropdown-options"
        className={`
          absolute top-[80px] 
          z-[1000]
          mt-2
          w-full rounded-lg
          bg-white shadow-xl dark:bg-neutral-800

          ${options.length > 3 ? 'max-h-[150px] overflow-y-scroll' : ''}
        `}
      >
        {isOpen &&
          options.map(({ value, label }) => (
            <button
              key={`${value}${label}`}
              className={`
              mb l w-full
              border-transparent
              bg-transparent
              p-4
              outline  outline-2
            outline-transparent  first-of-type:rounded-t-lg
              last-of-type:rounded-b-lg focus-within:z-50 focus-within:bg-rose-200
              focus-within:text-neutral-50
              hover:bg-rose-300 hover:text-neutral-50 focus:border-green-300
              ${options.length <= 3 ? 'last-of-type:pb-5' : ''}
              text-left text-lg text-neutral-600 dark:text-neutral-200
            `}
              onClick={() => {
                setChosenValue(value as T);
                setIsOpen(false);
              }}
              tabIndex={0}
            >
              {label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Select;
