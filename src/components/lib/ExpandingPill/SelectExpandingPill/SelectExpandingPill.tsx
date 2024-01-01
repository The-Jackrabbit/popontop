import { useState } from 'react';
import { a } from 'react-spring';
import Select from '../../Select/Select';
import { ExpandingPill } from '../ExpandingPill';

export interface Props<T> {
  className?: string;
  isInitiallyExpanded: boolean;
  options: { label: string; value: T }[];
  label: string;
  labelClassName?: string;
  setValue: (value: T) => void;
  value: T;
}

export const SelectExpandingPill = <T extends string>({
  className = '',
  isInitiallyExpanded = false,
  label,
  labelClassName = 'text-md',
  options,
  setValue,
  value,
}: Props<T>) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isInitiallyExpanded);
  // const animateValueChange = useSpring({ val: value, from: { val: 0 } });

  return (
    <ExpandingPill
      className={className}
      isActive={isExpanded}
      toggleVisibility={() => setIsExpanded(!isExpanded)}
    >
      <p className={labelClassName}>{label}</p>
      <div className={labelClassName}>
        <a.div>{isExpanded ? '-' : '+'}</a.div>
      </div>
      <Select<T>
        isOpenByDefault={true}
        options={options}
        setValue={setValue}
        value={value}
        isMobile={false}
      />
    </ExpandingPill>
  );
};

export default SelectExpandingPill;
