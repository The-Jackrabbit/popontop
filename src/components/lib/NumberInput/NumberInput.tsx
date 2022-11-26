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
