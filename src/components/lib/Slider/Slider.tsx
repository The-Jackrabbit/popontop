import { ChangeEventHandler } from "react";

export interface Props {
  className?: string;
  label?: string;
  min: number;
  max: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  showValue?: boolean;
  value?: string;
}

export const Slider: React.FC<Props> = ({
  className = '',
  label,
  min,
  max,
  onChange,
  placeholder = 'Type here',
  showValue = true,
  value = '',
}) => {
  return (
    <div className={className+" outline-rose-200 outline-2  rounded-lg focus-within:outline outline-offset-2"}>
      {showValue ? (
        <label className="text-neutral-400 flex w-full justify-between">
          <span>{label ? label : null}</span>
          <span>{showValue ? value : null }</span>
        </label>
      ) : null}
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