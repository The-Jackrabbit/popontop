import { MouseEventHandler } from 'react';
import LoadingBouncer from '../../../../../../lib/LoadingBouncer/LoadingBouncer';

export interface Props {
  icon: React.ReactNode;
  isLoading: boolean;
  label: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const CLICK_CIRCLE_STYLE = `
  h-6 w-6
  flex text-center align-center content-center justify-center
  text-neutral-400 dark:text-neutral-50
  `;

export const EMPTY_CIRCLE_PROPS = {
  icon: null,
  isLoading: false,
  label: '',
  onClick: () => undefined,
};

export const ClickCircleButton: React.FC<Props> = ({
  icon,
  isLoading,
  label,
  onClick,
}) => {
  return (
    <button
      className="
        flex h-1/3
        basis-1/3 flex-col items-center
        justify-center
        rounded-full align-middle text-xs text-neutral-900 dark:text-neutral-400
      "
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingBouncer />
      ) : (
        <>
          <p className="text-4xl">{icon}</p>
          {label}
        </>
      )}
    </button>
  );
};

export default ClickCircleButton;
