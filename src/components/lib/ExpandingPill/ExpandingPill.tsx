import { useState } from 'react';
import { a } from 'react-spring';
import { useExpandingPill } from '../../../frontend/hooks/springs/use-expanding-pill';
import Input from '../Input/Input';

export interface Props {
  className?: string;
  isInitiallyOpen?: boolean;
  label: string;
}

export const ExpandingPill: React.FC<Props> = ({
  className = '',
  isInitiallyOpen = false,
  label,
}) => {
  const [isActive, setIsActive] = useState(isInitiallyOpen);
  const {
    borderRadiusStyle,
    opacityAnimationStyle,
    rowHeightStyle,
    togglePill,
  } = useExpandingPill({
    onExpand: () => setIsActive((isActive) => !isActive),
    onMinimize: () => setIsActive((isActive) => !isActive),
  });

  return (
    <a.div
      className={`
        ${className}
        cursor-pointer
        bg-white dark:bg-black
        px-2 py-1
        rounded-lg
        text-sm lg:text-xl
        shadow-lg
        flex flex-col
      `}
      style={{ ...borderRadiusStyle }}
    >
      <div
        className="flex-nowrap flex justify-between px-2"
        onClick={() => togglePill(isActive)}
      >
        <a.p
          // style={{ ...pillWidthStyle }}
          className="pr-4"
        >{label}</a.p>
        <a.button style={opacityAnimationStyle}>
          {isActive ? '-' : '+'}
        </a.button>
      </div>
      <a.div
        style={{
          ...rowHeightStyle,
        }}
        className="overflow-hidden px-2"
      >
        <Input
          className="w-full bg-neutral-100 "
          onChange={() => undefined}
          placeholder="#adf2da"
          value={'adf2da'}
        />
      </a.div>
    </a.div>
  )
}

export default ExpandingPill;
