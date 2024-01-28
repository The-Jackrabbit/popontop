import { PaintBrushIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Input from '../../Input/Input';
import { ExpandingPill } from '../ExpandingPill';

export interface Props {
  className?: string;
  isActive?: boolean;
  label: string;
  labelClassName?: string;
  placeholder?: string;
  setValue: (value: string) => void;
  value: string | null;
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

type PropsTwo = {
  className?: string;
  isActive?: boolean;
  label: string;
  labelClassName?: string;
  onClickExpand: () => void;
  onClickMinify: () => void;
  placeholder?: string;
  setValue: (value: string) => void;
  switchComponent: React.ReactNode;
  value: string;
};

export const TextAndSwitchExpandingPill: React.FC<PropsTwo> = ({
  className = '',
  isActive = false,
  label,
  labelClassName = 'text-md',
  onClickExpand,
  onClickMinify,
  placeholder = '#adf2da',
  setValue,
  switchComponent,
  value,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isActive);
  return (
    <ExpandingPill
      className={className}
      height="100px"
      isActive={isExpanded}
      isOpenByDefault={isActive}
      toggleVisibility={() => {
        if (isExpanded) {
          onClickMinify();
        } else {
          onClickExpand();
        }
        setIsExpanded(!isExpanded);
      }}
    >
      <p className={labelClassName}>{label}</p>
      <button className={labelClassName}>
        {!isExpanded ? (
          <PaintBrushIcon className="h-4 w-4 text-neutral-900 dark:text-neutral-50" />
        ) : (
          '-'
        )}
      </button>
      <>
        <Input
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          value={value}
        />
        <div className="mt-4">{switchComponent}</div>
      </>
    </ExpandingPill>
  );
};

export default TextExpandingPill;
