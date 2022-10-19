import { ChangeEventHandler } from "react";

export interface Props {
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
}

export const Input: React.FC<Props> = ({
  label,
  onChange,
  placeholder = 'Type here',
  value = '',
}) => {
  return (
    <>
      {label ? <label className="text-neutral-400">{label}</label> : null}
      <input
        className={`
          dark:bg-neutral-700 
          focus-within:outline focus-within:outline-rose-200
          mt-2 p-4 outline-none w-full h-12 
          text-lg text-neutral-900 dark:text-white placeholder:text-neutral-400
          flex justify-between
          border-transparent rounded-md
        `}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </>
   
  );
}

export default Input;