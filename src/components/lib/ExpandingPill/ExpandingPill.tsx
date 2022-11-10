import { a } from 'react-spring';
import { useExpandingPill } from '../../../frontend/hooks/springs/use-expanding-pill';
import { ChangeEventHandler } from "react";
import { useZoomOnHover } from '../../../frontend/hooks/springs/use-zoom-on-hover';

export interface Props {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
  className?: string;
  isActive: boolean;
  toggleVisibility: () => void;
}

export const ExpandingPill: React.FC<Props> = ({
  children,
  className = '',
  isActive,
  toggleVisibility,
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
        className="flex-nowrap flex justify-between content-center items-center px-2"
        onClick={() => {
          togglePill(isActive)
          onMouseLeave();
        }}
      >
        {children[0]}
        <a.button
          style={opacityAnimationStyle}
          className="hover:text-rose-300 dark:text-white"
        >
          {isActive ? '-' : children[1]}
        </a.button>
      </div>
      <a.div
        style={{
          ...rowHeightStyle,
        }}
        className="overflow-hidden px-2"
      >
        {children[2]}
      </a.div>
    </a.div>
  )
}

export default ExpandingPill;
