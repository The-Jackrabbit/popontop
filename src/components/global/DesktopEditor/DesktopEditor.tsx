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
  albums?: Album[];
  readonly?: boolean;
  chartName?: string;
}

const DesktopEditor: React.FC<Props> = ({ chartName = 'My chart', albums = generateBoard(), readonly = false }) => {
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
    from: { width: '300px' },
  }));
  const [titleStyle, animateTitleStyle] = useSpring(() => ({
    from: { height: '0px' },
  }));

  const [numberOfColumns, setNumberOfColumns] = useState(10);
  const [numberOfRows, setNumberOfRows] = useState(10);
  console.log({ albums })
  return (
    <div className="w-screen flex justify-center">
      <DndContext
        onDragStart={(event) => setDraggedAlbum(event.active.data.current as any)}
        onDragEnd={handleDragEnd}
      >
        <div className="
          w-[600px
          md:w-[750px] 
          lg:w-[1000px] 
          flex flex-row
        ">
          {!readonly && (
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
                numberOfColumns={numberOfColumns}
                numberOfRows={numberOfRows}
                setNumberOfColumns={setNumberOfColumns}
                setNumberOfRows={setNumberOfRows}
              />
            </div>
          )}
          <div className="flex justify-center">
            <div className="p-4 page-content py-8">
              <a.div style={titleStyle} className="overflow-y-hidden">
                <Title
                  chartTitle={chartTitle}
                  setValue={(val: string) => setChartTitle(val)}
                  showIntroduction={true}
                />
              </a.div>
              <DesktopChart
                numberOfColumns={numberOfColumns}
                numberOfRows={numberOfRows}
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
