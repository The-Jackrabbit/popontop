import Image from "next/image";
import { a } from 'react-spring';
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useZoomOnHover } from "../../../../../frontend/hooks/springs/use-zoom-on-hover";

const ProfileCircle: React.FC = () => {
  const { data: sessionData } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const {
    zoomOnHoverStyle,
    onMouseLeave,
    onMouseOver,
  } = useZoomOnHover();

  return (
    <div
      className="
        flex-grow-0 first-of-type:mt-0 mt-0
        relative
      "
    >
      {isHovered && (
        <div className="absolute -left-[120px]">
        <div
          // Bubble content
          className="
            dark:bg-white bg-black
            dark:text-neutral-800 text-neutral-50
            pl-4 pr-4 py-2 
            rounded-xl
            shadow-lg
          "
        >
          {sessionData
            ? 'Sign out'
            : (
              <div>
                Log in with
                <div className="inline ml-2 mt-1"> 
                  <Image
                    src="/assets/google-logo.png"
                    width="16px"
                    height="16px"
                    alt="google"  
                  />
                </div>
              </div>
          )} 
        </div>
        <div
          // Caret
          className="
            translate-x-[5.3rem]
            -translate-y-[150%]
            bg-black dark:bg-white
            h-3 w-3
            py-2 rotate-45
          "
        />
      </div>
      )}
      <a.div
        className="
          shadow-xl
          cursor-pointer
          h-11 w-11
          rounded-full
          bg-rose-300
        "
        style={{ ...zoomOnHoverStyle }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
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
    </div>
  );
};

export default ProfileCircle;
