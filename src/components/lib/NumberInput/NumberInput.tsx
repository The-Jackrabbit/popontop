import { useState } from "react";

export interface Props {
  className?: string;
  currentValue: number;
  label: string;
  onDecrement: () => void;
  onIncrement: () => void;
}

export const useIncrementer = ({
  incrementAmount = 1,
  initialAmount = 5,
  max = 10,
  min = 0,
}: {
  incrementAmount?: number;
  initialAmount?: number;
  max?: number;
  min?: number;
}): [ number, () => void, () => void] => {
  const [value, setValue] = useState(initialAmount);
  const onDecrement = () =>
    value <= min
      ? undefined
      : setValue(value - incrementAmount);
  const onIncrement = () =>
    value >= max 
    ? undefined
    : setValue(value + incrementAmount); 

  return [
    value,
    onIncrement,
    onDecrement,
  ];
};

export const NumberInput: React.FC<Props> = ({
  className = 'flex w-full justify-between',
  currentValue,
  label,
  onDecrement,
  onIncrement,
}) => (
  <div className={className}>
    <div>
      {label}
    </div>
    <div
      className="
        -neutral-300
        min-w-[150px] max-w-[200px]
        rounded-full
        [2px]
        flex flex-row justify-between align-middle content-center
      "
    >
      <button 
        className="
        w-auto
          bg-neutral-800
          grow
          mr-[2px]
          rounded-tl-full rounded-bl-full
        "
        onClick={() => onDecrement()}
      >
        -
      </button>
      <p 
        className="
          bg-neutral-800
          shrink-0 w-10
          grow text-center
        "
      >
        {currentValue}
      </p>
      <button 
        className="
          bg-neutral-800
          ml-[2px]
          rounded-tr-full rounded-br-full
          w-auto
          grow
        " 
        onClick={() => onIncrement()}
      >
        +
      </button>
    </div>
  </div>
);

export default NumberInput; 
