import React from 'react';
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { a, useSpring } from "react-spring";
import { EMPTY_ALBUM } from '../../../constants/empty-album';
import { generateBoard } from '../../../utils/instantiators';
import Title from '../MobileEditor/Title/Title';
import DesktopActions from './Actions/DesktopActions';
import ChartList from './ChartList/ChartList';
import DesktopSidebar from './Sidebar/DesktopSidebar';
import { Album } from '../../../types/Albums';
import DesktopChart from './DesktopChart/DesktopChart';

export interface Props {
  chartComponent: () => JSX.Element;
  sidebarComponent: () => JSX.Element;
}

const DesktopEditor: React.FC<Props> = ({
  chartComponent,
  sidebarComponent,
}) => {
  const [containers, setContainers] = useState(albums);
  const [draggedAlbum, setDraggedAlbum] = useState({
    album: EMPTY_ALBUM,
    index: -1,
  });
  const [backgroundColor, setBackgroundColor] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [borderSize, setBorderSize] = useState(1);
  const [textColor, setTextColor] = useState('black');
  const [chartTitle, setChartTitle] = useState(chartName);
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
      newContainers.splice(droppedIndex, 1, draggedAlbum.album as Album);

      return newContainers;
    });
  };
  const [listStyles, animateListStyles] = useSpring(() => ({
    from: { width: '0px' },
  }));
  const [titleStyle, animateTitleStyle] = useSpring(() => ({
    from: { height: '0px' },
  }));

  const [numberOfColumns, setNumberOfColumns] = useState(10);
  const [numberOfRows, setNumberOfRows] = useState(10);
  console.log({ albums })

  const toggleTitle = (val: boolean): void => {
    setShowTitle(val);
    animateTitleStyle.start({
      height: val ? '72px' : '0px',
    });
  };

  const toggleAlbums = (val: boolean): void => {
    setShowAlbums(val);
    animateListStyles.start({
      width: val ? '200px' : '0px',
    });
  };

  return (
    <div
      // bg-red-400 sm:bg-green-400 md:bg-blue-400 lg:bg-yellow-400
      // xl:bg-neutral-400 2xl:bg-lime-400 3xl:bg-indigo-400
      className="flex justify-center min-w-[1000px]"
    >
      <DndContext
        autoScroll={false}
        onDragStart={
          (event) => setDraggedAlbum(event.active.data.current as any)
        }
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-row basis-[content]">
          {!readonly && (
            <div className="sidebar-container">
              {() => sidebarComponent()}
            </div>
          )}
          <div className="flex justify-center">
            <div className="flex flex-col items-center basis-[65%] px-4 py-8">
              <a.div style={titleStyle} className="overflow-y-hidden">
                <Title
                  chartTitle={chartTitle}
                  setValue={(val: string) => setChartTitle(val)}
                  showIntroduction={true}
                />
              </a.div>
              {() => chartComponent()}
            </div>
          </div>
          <ChartList
            listStyles={listStyles}
            textColor={textColor}
            containers={containers}
          />
          {!readonly && (
            <DesktopActions
              list={containers}
              chartTitle={chartTitle}
            />
          )}
        </div>
      </DndContext>
    </div>
  );
};

export default DesktopEditor;
