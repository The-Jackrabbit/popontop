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
    <div className="outline-rose-200 outline-2  rounded-lg focus-within:outline outline-offset-2">
      <label className="text-neutral-400 flex w-full justify-between">
        <span>{label}</span>
        <span>{value}</span>
      </label>
      <input
        className="
          slider   shadow-lg 
          p-0 w-full text-lg 
          appearance-none bg-transparent
          cursor-pointer
         focus-within:text-rose-300
          outline-none
        "
        onChange={onChange}
        placeholder={placeholder}
        type="range"
        min={min}
        max={max}
        value={value}
        data-value={value}
      />
    </div>
  );
}

export default Slider;