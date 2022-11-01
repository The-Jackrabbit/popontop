import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import DesktopSidebar from "../components/global/DesktopEditor/Sidebar/DesktopSidebar";
import DesktopActions from "../components/global/DesktopEditor/Actions/DesktopActions";
import DesktopEditor from "../components/global/DesktopEditor/DesktopEditor";
import Image from "next/image";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { Album } from "../types/Albums";
import { a, useSpring } from "react-spring";
import Title from "../components/global/MobileEditor/Title/Title";
import { EMPTY_ALBUM } from "../constants/empty-album";
import { generateBoard } from "../utils/instantiators";
import ChartList from "../components/global/DesktopEditor/ChartList/ChartList";

const Home: NextPage = () => {
  const [containers, setContainers] = useState(generateBoard());
  const [draggedAlbum, setDraggedAlbum] = useState({
    album: EMPTY_ALBUM,
    index: -1,
  });
  const [backgroundColor, setBackgroundColor] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [borderSize, setBorderSize] = useState(1);
  const [textColor, setTextColor] = useState('');
  const [chartTitle, setChartTitle] = useState('My chart');
  const [showAlbums, setShowAlbums] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  
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
  };
  const [listStyles, animateListStyles] = useSpring(() => ({
    from: { width: '300px' },
  }));
  const [titleStyle, animateTitleStyle] = useSpring(() => ({
    from: { height: '0px' },
  }));

  return (
    <div className="w-screen flex justify-center">
      <DndContext
        onDragStart={(event) => setDraggedAlbum(event.active.data.current as any)}
        onDragEnd={handleDragEnd}
      >
        <div className=" flex flex-row app">
          <div className="sidebar-container">
            <DesktopSidebar
              showAlbums={showAlbums}
              setShowAlbums={(val: boolean) => {
                setShowAlbums(val);
                animateListStyles.start({
                  width: val ? '300px' : '0px',
                });
              }}
              showTitle={showTitle}
              setShowTitle={(val: boolean) => {
                setShowTitle(val);
                animateTitleStyle.start({
                  height: val ? '72px' : '0px',
                });
              }}
              borderColor={borderColor}
              setBorderColor={setBorderColor}
              textColor={textColor}
              setTextColor={setTextColor}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              borderSize={borderSize}
              setBorderSize={setBorderSize}
            />
          </div>
          <div className="flex justify-center">
            <div className="p-4 page-content py-8">
              <a.div style={titleStyle} className="overflow-y-hidden">
                <Title
                  chartTitle={chartTitle}
                  setValue={(val: string) => setChartTitle(val)}
                  showIntroduction={true}
                />
              </a.div>
              <DesktopEditor
                containers={containers}
                backgroundColor={backgroundColor}
                borderColor={borderColor}
                borderSize={borderSize}
              />
            </div>
          </div>
          <ChartList
            listStyles={listStyles}
            textColor={textColor}
            containers={containers}
          />
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
