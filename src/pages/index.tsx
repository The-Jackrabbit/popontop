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
import { a, config, useSpring } from "react-spring";

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

    setContainers((oldContainers) => {
      const newContainers = [...oldContainers];

      newContainers[draggedAlbum.index] = EMPTY_ALBUM;
      console.log({ droppedIndex })
      newContainers.splice(droppedIndex, 1, draggedAlbum.album as Album);

      return newContainers;
    });
    // setParent(over ? over.id as string : null);
  }

  const [isListVisible, setIsListVisible] = useState(true);
  const [listStyles, animateListStyles] = useSpring(() => ({
    from: { width: '300px' },
    // config: config.stiff
  }));
  const toggleList = () => {
    animateListStyles.start({
      width: !isListVisible ? '300px' : '0px',
    });
    setIsListVisible(!isListVisible);
  };

  return (
    <div className="w-screen flex justify-center">
      <DndContext
        onDragStart={(event) => {
           console.log(event.active.data.current );
          setDraggedAlbum(event.active.data.current as any);
        }}
        onDragEnd={handleDragEnd}
      >
        <div className=" flex flex-row app">
          <div className="sidebar-container">
            <DesktopSidebar />
          </div>
          <div className="flex justify-center">
            <div className="p-4 page-content">
              <DesktopEditor containers={containers} />
              <button onClick={() => toggleList()}>
                Toggle
              </button>
            </div>
          </div>
          <a.div style={{ ...listStyles }} className="overflow-x-hidden h-screen">
            <ol className="dark:text-neutral-50 text-[8px] list-disc list-item">
              {containers.map((album, index) => (
                <li className="list-decimal list-inside list-item" key={index+'list'}>
                   {album.artist} - {album.name}
                </li>
              ))}
            </ol>
          </a.div>
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
