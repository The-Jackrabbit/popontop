import { Color } from "../../global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot";
import { RadioOption } from "./RadioOption/RadioOption";

export interface Props {
  onClick: (value: boolean) => void;
  value: boolean;
}

export const Radio: React.FC<Props> = ({
  onClick,
  value,
}) => {
  return (
    <div className="w-full h-12 flex flex-col justify-between">
      <RadioOption
        color={Color.green}
        isActive={value}
        label="yes"
        onClick={() => onClick(true)}
      />
      <RadioOption
        color={Color.rose}
        isActive={!value}
        label="no"
        onClick={() => onClick(false)}
      />
    </div>
  )
}

export default Radio;
