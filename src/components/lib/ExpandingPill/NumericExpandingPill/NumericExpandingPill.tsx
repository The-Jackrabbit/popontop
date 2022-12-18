import { useState } from 'react';
import { useSpring, a } from 'react-spring';
import Slider from '../../Slider/Slider';
import ExpandingPill from '../ExpandingPill';

export interface Props {
  className?: string;
  label: string;
  labelClassName?: string;
  max: number;
  min: number;
  setValue: (value: number) => void;
  value: number;
}

export const NumericExpandingPill: React.FC<Props> = ({
  className = '',
  label,
  labelClassName = 'text-xs',
  max,
  min,
  setValue,
  value,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const animateValueChange = useSpring({ val: value, from: { val: 0 } });

  return (
    <ExpandingPill
      className={className}
      isActive={isExpanded}
      toggleVisibility={() => setIsExpanded(!isExpanded)}
    >
      <p className={labelClassName}>{label}</p>
      <div className="">
        <a.div>
          {!isExpanded
            ? animateValueChange.val.to((val) => Math.floor(val))
            : value}
        </a.div>
      </div>
      <Slider
        className="flex h-10 "
        max={max}
        min={min}
        onChange={(e) => setValue(parseInt(e.target.value))}
        showValue={false}
        value={value.toString()}
      />
    </ExpandingPill>
  );
};

export default NumericExpandingPill;
