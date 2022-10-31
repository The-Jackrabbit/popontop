import { useSession } from "next-auth/react";
import Image from "next/image";
import { trpc } from "../../../../../utils/trpc";

const ProfileCircle: React.FC = () => {
  // const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  // const { data: sessionData } = useSession();

  return (
    <div
      className="
        shadow-xl
        m-4
        cursor-pointer
        h-11 w-11
        rounded-full
        bg-rose-300
      "
    >
      <p className="p-2 text-2xl">🪵</p>
      {/* <Image
        className="rounded-full"
        // src={sessionData?.user?.image as string}
        height="50px"
        width="50px"
        alt="profile"
      /> */}
    </div>
  );
};

export default ProfileCircle;
