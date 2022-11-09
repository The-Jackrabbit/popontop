export interface Props {
  children: React.ReactNode;
  className?: string;
  containerPositionStyle: string;
  containerWidthStyle: string;
  isVisible?: boolean;
  label: string | React.ReactNode;
  pointerPositionStyle: string;
}

export const TOP_POSITION_STYLE = {
  containerPositionStyle: "bottom-[calc(100%_+_0.75rem)]",
  containerWidthStyle: "",
  pointerPositionStyle: "left-[calc(50%_-_0.375rem)] -translate-y-[0.375rem]"
};

export const LEFT_POSITION_STYLE = {
  containerPositionStyle: "right-[calc(100%_+_0.75rem)]",
  containerWidthStyle: "",
  pointerPositionStyle: "left-full top-1/2 -translate-y-[0.375rem] -translate-x-[0.375rem]"
};

const ButtonWithAccessory: React.FC<Props> = ({
  children,
  className = '',
  containerPositionStyle,
  containerWidthStyle,
  isVisible = true,
  label,
  pointerPositionStyle,
 }) => {
  if (!isVisible) {
    return <>{children}</>;
  }

  return (
    <div className={className+"flex justify-center content-center items-center self-center  relative "}>
      <div className={`absolute ${containerPositionStyle}`}>
        <div
          // Bubble content
          className={`
            ${containerWidthStyle}
            overflow-x-hidden whitespace-nowrap
            dark:bg-white bg-black
            dark:text-neutral-800 text-neutral-50
            pl-4 pr-4 py-2 
            rounded-xl
            shadow-lg
          `}
        >
          {label}
        </div>
        <div
          // Caret
          className={`
            absolute ${pointerPositionStyle}
            bg-black dark:bg-white
            h-3 w-3
            rotate-45
          `}
        />
      </div>
      {children}
    </div>
  );
}

export default ButtonWithAccessory;