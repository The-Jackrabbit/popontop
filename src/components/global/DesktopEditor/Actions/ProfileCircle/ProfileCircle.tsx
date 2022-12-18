import Image from 'next/image';
import { a } from 'react-spring';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useZoomOnHover } from '../../../../../frontend/hooks/springs/use-zoom-on-hover';
import ButtonWithAccessory, {
  LEFT_POSITION_STYLE,
} from '../../../../lib/ButtonWithAccessory/ButtonWithAccessory';

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
          <div className="flex flex-row gap-2">
            Log in with
            <Image
              src="/assets/google-logo.png"
              width="16px"
              height="16px"
              alt="google"
            />
          </div>
        )
      }
    >
      <a.button
        className="h-12 
          w-12
          rounded-full bg-rose-300
          shadow-xl
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
          <p className="p-2 text-2xl">🪵</p>
        )}
      </a.button>
    </ButtonWithAccessory>
  );
};

export default ProfileCircle;
