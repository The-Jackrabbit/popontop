import Image from "next/image";
import { trpc } from "../../../../../utils/trpc";
import { a, config, useSpring } from 'react-spring';
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const ProfileCircle: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();
  const [buttonStyle, animatebuttonStyle] = useSpring(() => ({
    from: { scale: 1 },
    config: {
      ...config.wobbly,
      bounce: 1.2
    },
  }));
  const onMouseOver = () => animatebuttonStyle.start({scale: 1.1});
  const onMouseLeave = () => animatebuttonStyle.start({scale: 1.0});
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
    {isHovered && (
     <div
     className="
       bg-white dark:bg-black
       text-neutral-800 dark:text-neutral-50
       pl-4 pr-4 py-2 
       rounded-xl absolute
       -translate-x-[105%]
       shadow-lg
       translate-y-4
     "
    >
    {sessionData ? 'Sign out' : 'Log in'}
    </div>
    )}
   
    <a.div
      className="
        shadow-xl
        m-4
        cursor-pointer
        h-11 w-11
        rounded-full
        bg-rose-300
      "
      style={{...buttonStyle}}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
      onMouseEnter={() => onMouseOver()}
      onMouseLeave={() => onMouseLeave()}
      onClick={sessionData ? () => signOut() : () => signIn('google')}
    >

      {sessionData
        ? (
          <Image
            className="rounded-full"
            src={sessionData?.user?.image as string}
            height="50px"
            width="50px"
            alt="profile"
          />
        )
        : <p className="p-2 text-2xl">🪵</p>
      }
    </a.div>
    </>
  );
};

export default ProfileCircle;
