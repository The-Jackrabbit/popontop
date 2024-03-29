import Image from 'next/image';
import { a } from 'react-spring';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useZoomOnHover } from '../../../../../../frontend/hooks/springs/use-zoom-on-hover';
import ButtonWithAccessory, {
  LEFT_POSITION_STYLE,
} from '../../../../../lib/ButtonWithAccessory/ButtonWithAccessory';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { ICON_STYLE } from '../../../../../lib/FilterButton/FilterButton';

const ProfileCircle: React.FC = () => {
  const { data: sessionData } = useSession();
  const { zoomOnHoverStyle } = useZoomOnHover();

  return (
    <ButtonWithAccessory
      {...LEFT_POSITION_STYLE}
      label={
        sessionData ? (
          'Sign out'
        ) : (
          <div className="flex flex-row gap-2">Log in</div>
        )
      }
    >
      <a.button
        className="h-12
          w-12
          rounded-full bg-white shadow-xl
          dark:bg-black
        "
        style={{
          ...zoomOnHoverStyle,
        }}
        onClick={sessionData ? () => signOut() : () => signIn('google')}
      >
        {sessionData ? (
          <Image
            className="rounded-full"
            src={sessionData?.user?.image as string}
            height="50px"
            width="50px"
            alt="profile"
          />
        ) : (
          <p className="flex justify-center p-2 text-center align-middle text-2xl">
            <UserCircleIcon className={ICON_STYLE} />
          </p>
        )}
      </a.button>
    </ButtonWithAccessory>
  );
};

export default ProfileCircle;
