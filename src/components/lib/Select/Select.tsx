import { useState } from "react";

export interface Option {
  label: string;
  value: string;
}

export interface Props {
  label?: string,
  isOpenByDefault: boolean;
  options: Option[];
  placeholder?: string;
  setChosenValue: (value: string) => void;
  value: string;
}

export const Select: React.FC<Props> = ({
  label = 'Label',
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
  return (
    <div
      className="flex flex-col pb-4"
      onAbort={() => console.log}
      onBlur={(e) => {
        if (!blurLock) {

        console.log('onBlur');
          setIsOpen(false);
        }
      }}
    >
      <label className="text-neutral-400">{label}</label>
      <button
        className={`
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
        onClick={() => setIsOpen(!isOpen)}
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
      </button>
      <div className="shadow-2xl z-0 
              rounded-lg">
        {isOpen && options.map(({ value, label } ) => (
          <button
            key={`${value}${label}`}
            className={`
              bg-white dark:bg-neutral-800
              outline outline-2 outline-transparent
              border-transparent
              focus-within:z-50
              hover:bg-rose-200 hover:text-neutral-50  

              focus-within:bg-rose-200 focus-within:text-neutral-50 focus:border-green-300
              active:bg-rose-300
              w-full h-12 mb p-4 
              text-left text-lg text-neutral-600 dark:text-neutral-200
            `}
            onPointerDown={() => {
              setBlurLock(true);
            }}
            onClick={() => {
              // console.log
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