import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import DesktopSidebar from "../components/global/DesktopEditor/Sidebar/DesktopSidebar";
import DesktopActions from "../components/global/DesktopEditor/Actions/DesktopActions";
import DesktopEditor, { EMPTY_ALBUM, generateBoard } from "../components/global/DesktopEditor/DesktopEditor";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { Album } from "../types/Albums";

const Home: NextPage = () => {
  const [containers, setContainers] = useState(generateBoard());
  const [draggedAlbum, setDraggedAlbum] = useState({
    album: EMPTY_ALBUM,
    index: -1,
  });
  
  const handleDragEnd = (event:  DragEndEvent) => {
    const { over } = event;

    if (!over) {
      return;
    }
    
    const droppedIndex = parseInt(over.id as string);
    console.log({
      draggedIndex,
      droppedIndex,
    })
    setContainers((oldContainers) => {
      const newContainers = [...oldContainers];
      const temp = {...newContainers[draggedIndex]};
      newContainers[draggedIndex] = EMPTY_ALBUM;
      newContainers.splice(droppedIndex, 0, temp as Album);

      return newContainers;
    });
    // setParent(over ? over.id as string : null);
  }
  return (
    <div className="w-screen flex justify-center">
      <DndContext
        onDragStart={(event) => {
          setDraggedAlbum(event.active.data);
        }}
        onDragEnd={handleDragEnd}
      >
        <div className="min-w-screen-md flex flex-row app">
          <div className="sidebar-container">
            <DesktopSidebar />
          </div>
          <div className="p-4 page-content">
            <DesktopEditor containers={containers} />
          </div>
         <DesktopActions />
        </div>
      </DndContext>
      
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
          <Image src={sessionData?.user?.image as string} height="50px" width="50px" alt="profile" />
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
