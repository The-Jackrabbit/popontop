import { useState } from "react";
import styles from './Select.module.css';

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

  return (
    <div className={styles.select + " flex flex-col"}>
      <label className="mb-4">{label}</label>
      <button
        className={`
          ${value ? 'exists' : ''}
          ${styles.chosenValue}
          justify-between flex
          h-12 p-4 w-full
          mb-2
          text-lg border-transparent
        `}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <div className={styles.text}>
          {value  
            ? <p className="value">{
              options
                .find((option: Option): boolean => value === option.value)?.label}
                </p>
            : <p className="placeholder">{placeholder}</p>
          }
        </div>
        <div className={`
          ${styles.caret}
          ${isOpen ? styles.active : styles.inactive}
          active
        `}>
          ▽
        </div>
      </button>
      {isOpen && options.map(({ value, label } ) => (
        <button
          key={`${value}${label}`}
          className={`
            ${styles.option}
            w-full h-12 mb p-4 outline-none 
            text-left text-lg
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