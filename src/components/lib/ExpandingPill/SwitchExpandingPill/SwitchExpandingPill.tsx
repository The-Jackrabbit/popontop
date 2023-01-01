import { useState } from 'react';
import { Radio } from '../../Radio/Radio';
import { RadioIcon } from '../../Radio/RadioIcon';
import { ExpandingPill } from '../ExpandingPill';

export interface Props {
  className?: string;
  label: string;
  labelClassName?: string;
  setValue: (value: boolean | null) => void;
  value: boolean | null;
}

export const SwitchExpandingPill: React.FC<Props> = ({
  className = '',
  label,
  labelClassName = 'text-md',
  setValue,
  value,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <ExpandingPill
      className={className}
      isActive={isExpanded}
      toggleVisibility={() => setIsExpanded(!isExpanded)}
    >
      <p className={labelClassName}>{label}</p>
      <div className={labelClassName}>
        <RadioIcon variant={value} />
      </div>
      <Radio
        onClick={(value: boolean | null) => setValue(value)}
        value={Boolean(value)}
      />
    </ExpandingPill>
  );
};

export default SwitchExpandingPill;
