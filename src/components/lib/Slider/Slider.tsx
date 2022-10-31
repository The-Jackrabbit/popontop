import { ChangeEventHandler } from "react";

export interface Props {
  label?: string;
  min: number;
  max: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
}

export const Slider: React.FC<Props> = ({
  label = 'Label',
  min,
  max,
  onChange,
  placeholder = 'Type here',
  value = '',
}) => {
  return (
    <>
      <label className="text-neutral-400">{label}</label>
      <input
        className="
          slider   shadow-lg
          p-0 w-full text-lg 
          appearance-none bg-transparent
          cursor-pointer
          outline-2 outline-rose-200
          focus-within:outline focus-within:text-rose-300
          outline-offset-2
        "
        onChange={onChange}
        placeholder={placeholder}
        type="range"
        min={min}
        max={max}
        value={value}
        data-value={value}
      />
    </>
  );
}

export default Slider;