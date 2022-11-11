import { MouseEventHandler } from "react";
import LoadingBouncer from "../../../../../../lib/LoadingBouncer/LoadingBouncer";

export interface Props {
  icon: React.ReactNode;
  isLoading: boolean;
  label: string;
  onClick:  MouseEventHandler<HTMLButtonElement>;
}

export const ClickCircleButton: React.FC<Props> = ({
  icon,
  isLoading,
  label,
  onClick,
}) => {
  return (
    <button 
      className="
        basis-1/3 h-1/3 rounded-full
        text-xs
      "
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading
        ? <LoadingBouncer /> 
        : (
          <>
            <p className="text-4xl">{icon}</p>
            <p className="text-neutral-100">{label}</p>
          </>
        )
      }
    </button>
  );
};

export default ClickCircleButton;
