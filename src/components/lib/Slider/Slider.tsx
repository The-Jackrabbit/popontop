import { ChangeEventHandler } from "react";
import './Slider.css';

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
      <label>{label}</label>
      <input
        className="p-4 w-full text-lg h-12"
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