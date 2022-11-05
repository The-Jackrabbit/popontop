import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import DesktopEditor from "../components/global/DesktopEditor/DesktopEditor";
import Image from "next/image";
import { userAgent } from "next/server";
import { useState } from 'react';

const Home: NextPage = (props) => {
  // const r = trpc.charts.getUserCharts.useQuery();

  const [page, setPage] = useState('editor');
  return (
    <DesktopEditor
      page={page}
      setPage={setPage}
    />
  );
};

export default Home;
