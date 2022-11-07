import { a } from 'react-spring';
import { useExpandingPill } from '../../../frontend/hooks/springs/use-expanding-pill';
import Input from '../Input/Input';
import { ChangeEventHandler } from "react";
import { useZoomOnHover } from '../../../frontend/hooks/springs/use-zoom-on-hover';

export interface Props {
  className?: string;
  isActive: boolean;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  toggleVisibility: () => void;
  value: string;
}

export const ExpandingPill: React.FC<Props> = ({
  className = '',
  isActive,
  label,
  onChange,
  toggleVisibility,
  value,
}) => {
  const {
    borderRadiusStyle,
    opacityAnimationStyle,
    rowHeightStyle,
    togglePill,
  } = useExpandingPill({
    onExpand: () => toggleVisibility(),
    onMinimize: () =>  toggleVisibility(),
  });
  const {
    onMouseLeave,
    onMouseOver: onMouseEnter,
    zoomOnHoverStyle,
  } = useZoomOnHover();
  const mouseActions = isActive ? {} : {
    onMouseLeave,
    onMouseEnter,
  };
  return (
    <a.div
      className={`
        ${className}
        cursor-pointer
        bg-white dark:bg-black
        px-2 py-1
        rounded-lg
        text-xs
        shadow-lg dark:shadow-sm dark:shadow-neutral-800
        flex flex-col
      `}
      {...mouseActions}
      style={{
        ...borderRadiusStyle, 
        ...zoomOnHoverStyle,
      }}
    >
      <div
        className="flex-nowrap flex justify-between px-2"
        onClick={() => {
          togglePill(isActive)
          onMouseLeave();
        }}
      >
        <a.p className="pr-4">
          {label}
        </a.p>
        <a.button
          style={opacityAnimationStyle}
          className="hover:text-rose-300 dark:text-white"
        >
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
          onChange={onChange}
          placeholder="#adf2da"
          value={value}
        />
      </a.div>
    </a.div>
  )
}

export default ExpandingPill;
