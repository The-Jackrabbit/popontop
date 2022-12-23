import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useState } from 'react';
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
  setValue: Dispatch<SetStateAction<number>>;
  value: number;
}

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

  return (
    <ExpandingPill
      className={className}
      isActive={isExpanded}
      isOpenByDefault={isInitiallyExpanded}
      toggleVisibility={() => setIsExpanded(!isExpanded)}
    >
      <p className="text-lg">{label}</p>
      <div className={labelClassName}>
        <a.div>
          {isExpanded
            ? '-'
            : animateValueChange.val.to((val) => Math.floor(val))}
        </a.div>
      </div>
      <div className="flex h-full w-full">
        <button
          className="
            flex basis-1/3 items-center justify-center
            hover:bg-neutral-100 dark:hover:bg-neutral-900
          "
          onClick={onClickMinus}
        >
          <MinusIcon className={ICON_STYLE} />
        </button>
        <div className="flex basis-1/3 items-center justify-center text-3xl">
          <p>{value}</p>
        </div>
        <button
          className="
            flex basis-1/3 items-center justify-center
            hover:bg-neutral-100 dark:hover:bg-neutral-900
          "
          onClick={onClickPlus}
        >
          <PlusIcon className={ICON_STYLE} />
        </button>
      </div>
    </ExpandingPill>
  );
};

export default NumericExpandingPill;
