import { ChangeEventHandler } from 'react';

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
    <div
      className={
        className +
        ' rounded-lg outline-2  outline-offset-2 outline-rose-200 focus-within:outline'
      }
    >
      {showValue ? (
        <label className="flex w-full justify-between text-neutral-400">
          <span>{label ? label : null}</span>
          <span>{showValue ? value : null}</span>
        </label>
      ) : null}
      <input
        className="
          slider   w-full 
          cursor-pointer appearance-none bg-transparent 
          p-0 text-lg
          shadow-lg
         outline-none
          focus-within:text-rose-300
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
};

export default Slider;
