import { useState } from 'react';

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
}): {
  onIncrement: () => void;
  onDecrement: () => void;
  setValue: (value: number) => void;
  value: number;
} => {
  const [value, setValue] = useState(initialAmount);
  const onDecrement = () =>
    value <= min ? undefined : setValue(value - incrementAmount);
  const onIncrement = () =>
    value >= max ? undefined : setValue(value + incrementAmount);

  return {
    onDecrement,
    onIncrement,
    setValue,
    value,
  };
};
