import NavDot, {
  Color,
} from '../../../global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';

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
    <div className="flex content-center items-center" onClick={() => onClick()}>
      <NavDot
        ariaLabel="option"
        color={color}
        isActive={isActive}
        className="mr-2 h-8  w-8 border-none"
        onClick={() => onClick()}
      />
      <p className="text-xl dark:text-neutral-300">{label}</p>
    </div>
  );
};

export default RadioOption;
