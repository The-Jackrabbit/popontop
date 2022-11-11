
import { useState } from "react";
import Input from "../../Input/Input";
import { ExpandingPill } from "../ExpandingPill";

export interface Props {
  className?: string;
  label: string;
  labelClassName?: string;
  setValue: (value: string) => void;
  value: string;
}

export const TextExpandingPill: React.FC<Props> = ({
  className = '',
  label,
  labelClassName = 'text-xs',
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
      <button className="text-sm">
        {!isExpanded
            ? '✏️'
            : '-'
          }
      </button>
      <Input
        onChange={(event) => setValue(event.target.value)}
        placeholder="#adf2da"
        value={value}
      />
    </ExpandingPill>
  )
}

export default TextExpandingPill;
