import NavDot, {
  Color,
} from '../../../Desktop/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';

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
        py-1sm:px-4 relative
        z-30 select-none rounded-full bg-white
        px-2
        py-1
        text-lg dark:bg-black sm:py-1
      "
    >
      💿popontop
      {isActive ? (
        <NavDot
          ariaLabel="home badge indicator"
          color={Color.fuchsia}
          isActive={true}
          onClick={() => undefined}
          className="absolute top-[-36px] right-[-12px] h-4 w-4 animate-bounce"
        />
      ) : null}
    </h1>
  </div>
);

export default LogoButton;
