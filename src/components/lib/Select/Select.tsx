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
    <>
      <label>{label}</label>
      <button
        className={`${value ? 'exists' : ''} ${styles.select} ${styles['chosen-value']} justify-between flex h-12 p-4 text-lg w-full border-transparent`}
        tabIndex={0}

        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text">
          {value  
            ? <p className="value">{
              options
                .find((option: Option): boolean => value === option.value)?.label}
                </p>
            : <p className="placeholder">{placeholder}</p>
          }
        </div>
        <div className={styles["caret-container"]}>
          <div className={`${styles.caret} ${isOpen
            ? styles.active
            : styles.inactive
          }`}>▽</div>
        </div>
      
      </button>
      {isOpen && options.map(({ value, label } ) => (
        <button
          key={`${value}${label}`}
          className={`text-left ${styles.select} ${styles.option} h-12 p-4 outline-none text-lg w-full mb`}
          onClick={() => {
            setChosenValue(value);
            setIsOpen(false);
          }}
          tabIndex={0}
        >
          {label}
        </button>
      ))}
  </>
  );
}

export default Select;