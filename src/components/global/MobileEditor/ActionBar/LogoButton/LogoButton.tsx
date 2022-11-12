import NavDot, { Color } from "../../../DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot";

export interface Props {
  end: () => void;
  isActive: boolean;
  start: () => void;
}

export const LogoButton: React.FC<Props> = ({ end, isActive, start }) => (
  <div
    onClick={() => start()}
    className="grow-1 flex content-center justify-center"
  >
    <h1
      onTouchMove={(e) => e.stopPropagation()}
      onClick={end}
      className="
        bg-white dark:bg-black
        px-2 py-1 py-1sm:px-4 sm:py-1
        rounded-full
        relative
        select-none text-lg z-30
      "
    >
      💿popontop
      {isActive ? (
        <NavDot
          color={Color.fuchsia}
          isActive={true}
          onClick={() => undefined}
          className="w-4 h-4 animate-bounce absolute top-[-4px] right-[-2px]"
        />
      ): null}
    </h1>
  </div>
);

export default LogoButton;
