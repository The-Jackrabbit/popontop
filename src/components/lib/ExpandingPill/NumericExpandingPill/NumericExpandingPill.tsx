import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { useSpring, a } from 'react-spring';
import { ICON_STYLE } from '../../FilterButton/FilterButton';
import ExpandingPill from '../ExpandingPill';

export interface Props {
  className?: string;
  isInitiallyExpanded?: boolean;
  label: string;
  labelClassName?: string;
  max: number;
  min: number;
  placeholder?: string;
  setValue: Dispatch<SetStateAction<number>>;
  value: number;
}

export const NumericExpandingPillContent = ({
  max,
  min,
  placeholder = '',
  setValue,
  textColor = '',
  value,
}: {
  max: number;
  min: number;
  placeholder?: string;
  setValue: Dispatch<SetStateAction<number>>;
  textColor?: string;
  value: number;
}) => {
  const [isTypingModeActive, setIsTypingModeActive] = useState(false);

  const onClickMinus = () =>
    setValue((currentValue: number) => {
      if (currentValue > min) {
        return currentValue - 1;
      }

      return currentValue;
    });

  const onClickPlus = () =>
    setValue((currentValue: number) => {
      if (currentValue < max) {
        return currentValue + 1;
      }

      return currentValue;
    });

  const onDoubleClick = () => {
    setIsTypingModeActive((isTypingModeActive) => {
      return !isTypingModeActive;
    });
  };

  const onType = (event: ChangeEvent<HTMLInputElement>) =>
    setValue((): number => {
      if (event.target.value === '') {
        return 0;
      }

      return parseInt(event.target.value);
    });

  return (
    <div className="flex h-full w-full">
      <button
        className="
          flex basis-1/3 items-center justify-center
          hover:bg-neutral-100 dark:hover:bg-neutral-900
        "
        onClick={onClickMinus}
      >
        <MinusIcon className={ICON_STYLE} style={{ color: textColor }} />
      </button>
      <div className="flex basis-1/3 items-center justify-center text-3xl">
        <button onDoubleClick={onDoubleClick}>
          {isTypingModeActive ? (
            <input
              className={`
                w-full
                shrink
                bg-transparent
                p-2
                text-center text-sm
                text-black
                outline-1 outline-amber-300
                dark:text-white
              `}
              style={{ color: textColor }}
              autoFocus
              onChange={onType}
              onBlur={() => setIsTypingModeActive(false)}
              placeholder={placeholder}
              value={value.toString()}
            />
          ) : (
            <p style={{ color: textColor }}>{value}</p>
          )}
        </button>
      </div>
      <button
        className="
          flex basis-1/3 items-center justify-center
          hover:bg-neutral-100 dark:hover:bg-neutral-900
        "
        style={{ color: textColor }}
        onClick={onClickPlus}
      >
        <PlusIcon className={ICON_STYLE} style={{ color: textColor }} />
      </button>
    </div>
  );
};

export const NumericExpandingPill: React.FC<Props> = ({
  className = '',
  isInitiallyExpanded = false,
  label,
  labelClassName = 'text-md',
  max,
  min,
  setValue,
  value,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isInitiallyExpanded);
  const animateValueChange = useSpring({ val: value, from: { val: 0 } });

  return (
    <ExpandingPill
      className={className}
      isActive={isExpanded}
      isOpenByDefault={isInitiallyExpanded}
      toggleVisibility={() => setIsExpanded(!isExpanded)}
    >
      <p className={labelClassName}>{label}</p>
      <div className={labelClassName}>
        <a.div>
          {isExpanded
            ? '-'
            : animateValueChange.val.to((val) => Math.floor(val))}
        </a.div>
      </div>

      <NumericExpandingPillContent
        max={max}
        min={min}
        setValue={setValue}
        value={value}
      />
    </ExpandingPill>
  );
};

export default NumericExpandingPill;
