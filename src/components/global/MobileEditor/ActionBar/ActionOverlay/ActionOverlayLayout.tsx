
export interface Props {
  children: React.ReactNode;
  className?: string;
  onExit: (event: React.BaseSyntheticEvent<MouseEvent>) => void;
}

export const ActionOverlayLayout: React.FC<Props> = ({
  children,
  className = '-translate-x-4',
  onExit,
}) => (
  <div
    className={`
      bg-[rgba(100,100,100,_0.0)]]
      bg-gradient-to-b
      from-[rgba(240,240,240,0)]
      via-[rgba(240,240,240,0.2)]
      to-[rgba(240,240,240,1)]
      dark:from-[rgba(23,23,23,0)]
      dark:to-[rgba(23,23,23,1)]
      h-[110vh] w-[100vw] fixed top-0 left-0     
      flex flex-col items-center justify-center
      z-50
      ${className}
    `}
    onClick={onExit}
  >
    <div className="basis-1/2" />
    <div className="basis-1/2">
      {children}
    </div>
  </div>
);


export default ActionOverlayLayout;
