import NavDot, { Color } from "../../../global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot";

export interface Props {
  color: Color;
  isActive: boolean;
  label: string;
  onClick: () => void;
}

export const RadioOption: React.FC<Props> = ({
  color,
  isActive,
  label,
  onClick,
}) => {
  return (
    <div
      className="flex content-center items-center" 
      onClick={() => onClick()}
    >
      <NavDot
        ariaLabel="option"
        color={color}
        isActive={isActive}
        className="mr-2  border-none h-4 w-4"
        onClick={() => onClick()}
      />
      <p className="leading-none translate-y-[2px]">{label}</p>
    </div>
  )
}

export default RadioOption;
