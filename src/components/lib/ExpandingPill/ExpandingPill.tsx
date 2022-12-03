import { a } from 'react-spring';
import { useExpandingPill } from '../../../frontend/hooks/springs/use-expanding-pill';
import { useZoomOnHover } from '../../../frontend/hooks/springs/use-zoom-on-hover';

export interface Props {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
  className?: string;
  isActive: boolean;
  isOpenByDefault?: boolean;
  toggleVisibility: () => void;
}

export const ExpandingPill: React.FC<Props> = ({
  children,
  className = '',
  isActive,
  isOpenByDefault = false,
  toggleVisibility,
}) => {
  const {
    borderRadiusStyle,
    opacityAnimationStyle,
    rowHeightStyle,
    togglePill,
  } = useExpandingPill({
    isOpenByDefault,
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
        h-max max-w-full
        w-full 
        cursor-pointer
        bg-white dark:bg-black
        px-2 py-1
        rounded-lg
        text-xs
        shadow-lg dark:shadow-sm dark:shadow-neutral-800
        inline-flex flex-col
      `}
      {...mouseActions}
      style={{
        ...borderRadiusStyle, 
        ...zoomOnHoverStyle,
        // display: isActive ? 'flex' : 'inline-flex',
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
        <a.div
          style={opacityAnimationStyle}
          className="hover:text-rose-300 dark:text-white"
        >
          {children[1]}
        </a.div>
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
