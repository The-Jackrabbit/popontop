import { PaintBrushIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Input from '../../Input/Input';
import { ExpandingPill } from '../ExpandingPill';

export interface Props {
  className?: string;
  isActive?: boolean;
  label: string;
  labelClassName?: string;
  placeholder?: string;
  setValue: (value: string) => void;
  value: string;
}

export const TextExpandingPill: React.FC<Props> = ({
  className = '',
  isActive = false,
  label,
  labelClassName = 'text-md',
  placeholder = '#adf2da',
  setValue,
  value,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isActive);
  return (
    <ExpandingPill
      className={className}
      isActive={isExpanded}
      isOpenByDefault={isActive}
      toggleVisibility={() => setIsExpanded(!isExpanded)}
    >
      <p className={labelClassName}>{label}</p>
      <button className={labelClassName}>
        {!isExpanded ? (
          <PaintBrushIcon className="h-4 w-4 text-neutral-900 dark:text-neutral-50" />
        ) : (
          '-'
        )}
      </button>
      <Input
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </ExpandingPill>
  );
};

export default TextExpandingPill;
