import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import DesktopSidebar from "../components/global/Sidebar/DesktopSidebar";
import DesktopActions from "../components/global/Actions/DesktopActions";

const Home: NextPage = () => {
  return (
    <div className="w-screen flex justify-center ">
      <div className="min-w-screen-md flex flex-row app">
        <div className="sidebar-container">
          <DesktopSidebar />
        </div>
        <div className="p-4 page-content">
          <h1>hello world</h1>
        </div>
       <DesktopActions />
      </div>
    </div>
  );
};

export default Home;

export const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
