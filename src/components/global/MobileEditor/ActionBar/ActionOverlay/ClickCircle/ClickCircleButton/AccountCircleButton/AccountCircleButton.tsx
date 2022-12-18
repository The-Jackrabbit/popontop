import { signIn, signOut, useSession } from 'next-auth/react';
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import ClickCircleButton, { CLICK_CIRCLE_STYLE } from '../ClickCircleButton';

export const AccountCircleButton: React.FC = () => {
  const { data: sessionData } = useSession();

  const onClickLogin = () => {
    sessionData ? signOut() : signIn('google');
  };

  return (
    <ClickCircleButton
      icon={
        !sessionData ? (
          <UserCircleIcon className={CLICK_CIRCLE_STYLE} />
        ) : (
          <ArrowRightOnRectangleIcon className={CLICK_CIRCLE_STYLE} />
        )
      }
      isLoading={false}
      label={!sessionData ? 'log in' : 'sign out'}
      onClick={onClickLogin}
    />
  );
};

export default AccountCircleButton;
