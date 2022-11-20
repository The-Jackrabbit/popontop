import { MouseEventHandler } from "react";
import LoadingBouncer from "../../../../../../lib/LoadingBouncer/LoadingBouncer";

export interface Props {
  icon: React.ReactNode;
  isLoading: boolean;
  label: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
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
        text-neutral-900 dark:text-neutral-400
        basis-1/3 h-1/3 rounded-full
        text-xs
        flex flex-col align-middle justify-center items-center
      "
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading
        ? <LoadingBouncer /> 
        : (
          <>
            <p className="text-4xl">{icon}</p>
            {label}
          </>
        )
      }
    </button>
  );
};

export default ClickCircleButton;
