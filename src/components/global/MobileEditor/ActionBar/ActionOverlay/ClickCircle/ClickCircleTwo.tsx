
export interface Props {
  bottomButton: React.ReactNode;
  centerButton: React.ReactNode;
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
  topButton: React.ReactNode;
}

export const ClickCircle: React.FC<Props> = ({
  bottomButton,
  centerButton,
  leftButton,
  rightButton,
  topButton,
}) => (
  <div
    className="
      bg-[rgba(255,255,255,0.5)]
      dark:bg-[rgba(0,0,0,0.5)] shadow-lg
      z-50
      rounded-full h-64 w-64
      flex flex-wrap
    "

    onClick={(e) => e.stopPropagation()}
  >
    <div className="basis-1/3 h-1/3 rounded-full"></div>
    <div
      id="top"
      className="
        flex
        items-center align-middle content-center justify-center
        basis-1/3 h-1/3
        rounded-full
      "
    >
      {topButton}
    </div>
    <div className="basis-1/3 h-1/3 rounded-full"></div>
    {leftButton}
    <div
      className="
      bg-neutral-100 dark:bg-neutral-900 basis-1/3 h-1/3 rounded-full     
        flex-col text-center flex justify-center
      "
    >
      {centerButton}
    </div>
    {rightButton}
    <div className="basis-1/3 h-1/3 rounded-full"></div>
    {bottomButton}
    <div className="basis-1/3 h-1/3 rounded-full"></div>
  </div>
);

export default ClickCircle;
