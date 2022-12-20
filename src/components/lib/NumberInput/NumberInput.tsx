export interface Props {
  className?: string;
  currentValue: number;
  label: string;
  onDecrement: () => void;
  onIncrement: () => void;
}

export const NumberInput: React.FC<Props> = ({
  className = 'flex w-full justify-between',
  currentValue,
  label,
  onDecrement,
  onIncrement,
}) => (
  <div className={className}>
    <div className="text-xs">{label}</div>
    <div
      className="
        flex
        min-w-[150px] max-w-[200px]
        flex-row
        content-center justify-between rounded-full bg-neutral-300 align-middle
      "
    >
      <button
        className="
          mr-[2px]
          w-auto grow
          rounded-tl-full
          rounded-bl-full
          bg-neutral-200 dark:bg-neutral-800
        "
        onClick={() => onDecrement()}
      >
        -
      </button>
      <p
        className="
          w-10 shrink-0
          grow bg-neutral-200
          text-center dark:bg-neutral-800
        "
      >
        {currentValue}
      </p>
      <button
        className="
          ml-[2px] w-auto
          grow
          rounded-tr-full rounded-br-full
          bg-neutral-200
          dark:bg-neutral-800
        "
        onClick={() => onIncrement()}
      >
        +
      </button>
    </div>
  </div>
);

export default NumberInput;
