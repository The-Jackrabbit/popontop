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
import Layout from './Layout';
import { trpc } from '../../../utils/trpc';
import { ChartSettings } from '@prisma/client';

export interface Props {
  albums?: Album[];
  readonly?: boolean;
  chartName?: string;
  settings?: ChartSettings | null;
}

const DesktopEditor: React.FC<Props> = ({
  albums = generateBoard(),
  chartName = 'My chart',
  readonly = false,
  settings,
}) => {
  const [containers, setContainers] = useState(albums);
  const [draggedAlbum, setDraggedAlbum] = useState({
    album: EMPTY_ALBUM,
    index: -1,
  });
  const [backgroundColor, setBackgroundColor] = useState(settings?.background_color ?? '');
  const [borderColor, setBorderColor] = useState(settings?.border_color ?? '');
  const [borderSize, setBorderSize] = useState(1);
  const [showAlbums, setShowAlbums] = useState(settings?.show_albums ? settings?.show_albums : false);
  const [chartTitle, setChartTitle] = useState(chartName ?? '');
  const [textColor, setTextColor] = useState(settings?.text_color ?? '');
  const [showTitle, setShowTitle] = useState(settings?.show_title ?? false);
  
  const handleDragEnd = (event:  DragEndEvent) => {
    const { over } = event;

    if (!over) {
      return;
    }
    
    const droppedIndex = over ? parseInt(over.id as string) : -1;

    setContainers((oldContainers) => {
      const newContainers = [...oldContainers];

      newContainers[draggedAlbum.index] = EMPTY_ALBUM;
      if (droppedIndex !== -1) {
        newContainers.splice(droppedIndex, 1, draggedAlbum.album as Album);
      }

      return newContainers;
    });
  };

  const [listStyles, animateListStyles] = useSpring(() => ({
    from: { width: !showAlbums ? '0px' : '200px' },
  }));
  const [titleStyle, animateTitleStyle] = useSpring(() => ({
    from: { height: settings?.show_title ? '72px' : '0px' },
  }));

  const [numberOfColumns, setNumberOfColumns] = useState(10);
  const [numberOfRows, setNumberOfRows] = useState(10);

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

  const [savedChartId, setSavedChartId] = useState<null | string>(null);
  const mutation = trpc.charts.create.useMutation();
  const saveChart = async (): Promise<string> => {
    const result = await mutation.mutateAsync({
      name: chartTitle,
      albums: containers,
      settings: {
        backgroundColor,
        borderColor,
        borderSize,
        showAlbums,
        showTitle,
        textColor,
      }
    });

    return result.chart.uuid ?? '';
  };

  const save = async () => {
    const uuid = await saveChart();
    setSavedChartId(uuid);
  }

  debugger;
  return (
    <div className="flex justify-center min-w-[1000px]">
      <DndContext
        autoScroll={false}
        onDragStart={
          (event) => setDraggedAlbum(event.active.data.current as any)
        }
        onDragEnd={handleDragEnd}
      >
        <Layout
          isReadonly={readonly}
          sidebar={
            <DesktopSidebar
              showAlbums={showAlbums}
              setShowAlbums={toggleAlbums}
              showTitle={showTitle}
              setShowTitle={toggleTitle}
              borderColor={borderColor}
              setBorderColor={setBorderColor}
              backgroundColor={backgroundColor}
              setTextColor={setTextColor}
              textColor={textColor}
              setBackgroundColor={setBackgroundColor}
              borderSize={borderSize}
              setBorderSize={setBorderSize}
              numberOfColumns={numberOfColumns}
              numberOfRows={numberOfRows}
              setNumberOfColumns={setNumberOfColumns}
              setNumberOfRows={setNumberOfRows}
            />
          }
          title={
            <a.div style={titleStyle} className="overflow-y-hidden w-full">
              <Title
                chartTitle={chartTitle}
                setValue={(val: string) => setChartTitle(val)}
                showIntroduction={true}
                isReadOnly={readonly}
              />
            </a.div>
          }
          chart={
            <DesktopChart
              isReadOnly={readonly}
              numberOfColumns={numberOfColumns}
              numberOfRows={numberOfRows}
              containers={containers}
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              borderSize={borderSize}
            />
          }
          list={
            <ChartList
              listStyles={listStyles}
              containers={containers}
              textColor={textColor}
            />
          }
          actions={
            <DesktopActions
              isLoading={mutation.isLoading}
              save={save}
              savedChartId={savedChartId}
            />
          }
        />
      </DndContext>
    </div>
  );
};

export default DesktopEditor;
