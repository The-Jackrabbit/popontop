import { useState } from "react";
import './Select.css';

export interface Option {
  label: string;
  value: string;
}

export interface Props {
  isOpenByDefault: boolean;
  options: Option[];
  placeholder?: string;
  setChosenValue: (value: string) => void;
  value: string;
}

export const Select: React.FC<Props> = ({
  isOpenByDefault,
  options = [],
  placeholder = 'Type here',
  setChosenValue,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <button
        className={`${value ? 'exists' : ''} select chosen-value justify-between flex h-12 p-4 text-lg w-full border-transparent`}
        tabIndex={0}
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
        <div className="caret-container">

        <div className={`caret ${isOpen
          ? 'active'
          : 'inactive'
        }`}>▽</div>
        </div>
      
      </button>
      {isOpen && options.map(({ value, label } ) => (
        <button
          key={`${value}${label}`}
          className="text-left select option h-12 p-4 outline-none text-lg w-full mb"
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