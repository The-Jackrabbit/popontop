import FloatingButton from '../../../lib/FloatingButton/FloatingButton';
import { MouseEventHandler } from 'react';
import { CogIcon } from '@heroicons/react/24/solid';

export interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SettingsButton: React.FC<Props> = ({ onClick }) => (
  <FloatingButton
    isAbsolute={false}
    backgroundColor="hover:bg-red-200 active:bg-red-200"
    locationOnScreen="bottom-0 left-0"
    onClick={(e) => onClick(e)}
  >
    <CogIcon
      className="
        h-6 w-6 translate-y-[1px]
        text-neutral-900 dark:text-neutral-100
      "
    />
  </FloatingButton>
);

export default SettingsButton;
