export interface Props {
  bottomButton: React.ReactNode;
  centerButton: React.ReactNode;
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
  topButton: React.ReactNode;
}

export const ClickCircleLayout: React.FC<Props> = ({
  bottomButton,
  centerButton,
  leftButton,
  rightButton,
  topButton,
}) => (
  <div
    className="
      z-50
      flex h-64
      w-64
      flex-wrap rounded-full bg-[rgba(255,255,255,0.5)]
      shadow-lg dark:bg-[rgba(0,0,0,0.5)]
    "
    onClick={(e) => e.stopPropagation()}
  >
    <div className="h-1/3 basis-1/3 rounded-full"></div>
    <div
      id="top"
      className="
        flex
        h-1/3 basis-1/3 content-center items-center
        justify-center rounded-full
        align-middle
      "
    >
      {topButton}
    </div>
    <div className="h-1/3 basis-1/3 rounded-full"></div>
    {leftButton}
    <div
      className="
      flex h-1/3 basis-1/3 flex-col justify-center     
        rounded-full bg-neutral-100 text-center dark:bg-neutral-900
      "
    >
      {centerButton}
    </div>
    {rightButton}
    <div className="h-1/3 basis-1/3 rounded-full"></div>
    {bottomButton}
    <div className="h-1/3 basis-1/3 rounded-full"></div>
  </div>
);

export default ClickCircleLayout;
