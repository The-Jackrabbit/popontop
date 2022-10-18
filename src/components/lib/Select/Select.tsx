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
  const selectedValueLabel = options
    .find((option: Option): boolean => value === option.value)?.label
  return (
    <div className="flex flex-col">
      <label className="mb-4">{label}</label>
      <button
        className={`
          ${value
            ? 'bg-white dark:bg-black dark:text-neutral-50'
            : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
          }
          outline-2 outline-rose-200
          focus-within:outline focus-within:text-rose-300 
          justify-between flex
          h-12 p-4 w-full mb-2
          text-lg border-transparent
        `}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <div className="-translate-y-1">
          {value  
            ? <p className="text-neutral-800 dark:text-neutral-100">{selectedValueLabel}</p>
            : <p className="text-neutral-600 dark:text-neutral-400">{placeholder}</p>
          }
        </div>
        <div className="hover:text-rose-500 flex flex-row">
          <span
            className={`${isOpen
              ? 'text-rose-300'
              : ''
            }
            hover:text-rose-300
            text-neutral-600
            -translate-y-1
          `}>
            ▽△
          </span>
        </div>
      </button>
      {isOpen && options.map(({ value, label } ) => (
        <button
          key={`${value}${label}`}
          className={`
            bg-white dark:bg-neutral-800
            border-b border-rose-300
            hover:bg-rose-200 hover:text-neutral-50 
            focus-within:bg-rose-300 focus-within:text-neutral-50 
            w-full h-12 mb p-4 outline-none 
            text-left text-lg text-neutral-600 dark:text-neutral-200
          `}
          onClick={() => {
            setChosenValue(value);
            setIsOpen(false);
          }}
          tabIndex={0}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Select;