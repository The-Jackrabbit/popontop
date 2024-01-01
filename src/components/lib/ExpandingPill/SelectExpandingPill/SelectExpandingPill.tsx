import { useState } from 'react';
import { a } from 'react-spring';
import NavDot, {
  Color,
} from '../../../global/Desktop/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
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
      className={className + ' h-min-content z-50 '}
      isActive={isExpanded}
      toggleVisibility={() => setIsExpanded(!isExpanded)}
    >
      <p className={labelClassName}>{label}</p>
      <div className={labelClassName}>
        <a.div>{isExpanded ? '-' : '+'}</a.div>
      </div>
      <div className="">
        {options.map((option, index) => (
          <button
            key={`option-${index}`}
            className="mb-2 flex flex-row"
            onClick={() => setValue(option.value)}
          >
            <NavDot
              ariaLabel="option"
              color={option.value === value ? Color.amber : Color.blue}
              isActive={option.value === value}
              className="mr-2 h-3 w-3 border-none"
              onClick={() => undefined}
            />
            <p className=" dark:text-neutral-300">{option.label}</p>
          </button>
        ))}
      </div>
    </ExpandingPill>
  );
};

export default SelectExpandingPill;
