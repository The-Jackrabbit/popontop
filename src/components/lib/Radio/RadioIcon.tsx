import NavDot, { Color } from "../../global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot";

export interface Props {
  variant: boolean | null;
}

export const RadioIcon: React.FC<Props> = ({
  variant,
}) => (
  <>
    {variant == null ? (
      <>
        <NavDot
          ariaLabel="true option"
          className="h-2 w-2 -translate-y-1"
          isActive={true}
          onClick={() => true}
          color={Color.green}
        />
        {/* <p className="-rotate-90 leading-none">\</p> */}
        <NavDot
          ariaLabel="false option"
          className="h-2 w-2 translate-y-1"
          isActive={true}
          onClick={() => true}
          color={Color.rose}
          />
      </>
    ) : null}
    {variant === false ? (
      <NavDot
        ariaLabel="false option"
        className="h-4 w-4 "
        isActive={true}
        onClick={() => true}
        color={Color.rose}
      />
    ) : null}
    {variant === true ? (
      <NavDot
        ariaLabel="true option"
        className="h-4 w-4"
        isActive={true}
        onClick={() => true}
        color={Color.green}
      />
    ) : null}
  </>
)

export default RadioIcon;