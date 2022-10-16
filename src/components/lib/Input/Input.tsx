import { ChangeEventHandler } from "react";

export interface Props {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
}

export const Input: React.FC<Props> = ({
  label = 'Label',
  onChange,
  placeholder = 'Type here',
  value = '',
}) => {
  return (
    <>
      <label>{label}</label>
      <input
        className={`p-4 outline-none w-full text-lg justify-between flex h-12 border-transparent ${value.length > 0 ? 'has-value' : ''}`}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </>
   
  );
}

export default Input;