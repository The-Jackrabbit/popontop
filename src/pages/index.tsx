import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import DesktopEditor from "../components/global/DesktopEditor/DesktopEditor";
import Image from "next/image";
import { userAgent } from "next/server";

const Home: NextPage = (props) => {
  return (
    <DesktopEditor />
  );
};

export default Home;
