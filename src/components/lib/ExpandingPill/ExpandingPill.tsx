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
    onMinimize: () => toggleVisibility(),
  });
  const {
    onMouseLeave,
    onMouseOver: onMouseEnter,
    zoomOnHoverStyle,
  } = useZoomOnHover();
  const mouseActions = isActive
    ? {}
    : {
        onMouseLeave,
        onMouseEnter,
      };
  return (
    <a.div
      className={`
        ${className}
        inline-flex h-max
        w-full 
        max-w-full
        cursor-pointer flex-col
        rounded-lg bg-white
        px-2
        py-1
        text-sm shadow-lg dark:bg-black
        dark:shadow-sm dark:shadow-neutral-800
      `}
      {...mouseActions}
      style={{
        ...borderRadiusStyle,
        ...zoomOnHoverStyle,
        // display: isActive ? 'flex' : 'inline-flex',
      }}
    >
      <div
        className="flex flex-nowrap content-center items-center justify-between px-2"
        onClick={() => {
          togglePill(isActive);
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
  );
};

export default ExpandingPill;
