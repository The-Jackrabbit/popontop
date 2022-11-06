import { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { useSpring } from "react-spring";
import { EMPTY_ALBUM } from "../../constants/empty-album";
import { Album } from "../../types/Albums";
import { generateBoard } from "../../utils/instantiators";
import { trpc } from "../../utils/trpc";

const useChart = ({
  albums = generateBoard(),
  chartName = 'My chart',
  settings = null,
}: {
  albums?: Album[];
  chartName?: string;
  settings?: any | null;
}) : ChartState => {
  const [containers, setContainers] = useState(albums);

  const [draggedAlbum, setDraggedAlbum] = useState({
    data: EMPTY_ALBUM,
    origin: 'search',
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

    if (!over) { return; }
    
    const droppedIndex = over ? parseInt(over.id as string) : -1;

    setContainers((oldContainers) => {
      const newContainers = [...oldContainers];

      if (draggedAlbum.origin === 'chart') {
        newContainers[draggedAlbum.index] = EMPTY_ALBUM; 
      }

      if (droppedIndex !== -1) {
        newContainers.splice(droppedIndex, 1, draggedAlbum.data);
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

  return {
    mutation,
    titleStyle,
    listStyles,
    chart: {
      actions: {
        save,
        handleDragEnd,
        setDraggedAlbum,
        setChartTitle,
      },
      data: {
        chartTitle,
        entries: containers,
        savedChartId,
      },
      settings: {
        actions: {
          setBackgroundColor,
          setBorderColor,
          setBorderSize,
          setNumberOfColumns,
          setNumberOfRows,
          setTextColor,
          toggleAlbums,
          toggleTitle,
          setShowAlbums,
          setShowTitle,
        },
        data: {
          backgroundColor,
          borderColor,
          borderSize,
          numberOfColumns,
          numberOfRows,
          showAlbums,
          showTitle,
          textColor,
        },
      },
    }   
  };
};

export default useChart;

export interface SettingsData {
  borderColor: string;
  textColor: string;
  backgroundColor: string;
  borderSize: number;
  numberOfRows: number;
  numberOfColumns: number;
  showAlbums: boolean;
  showTitle: boolean;
}

export interface SettingsActions {
  setShowAlbums: (value: boolean) => void;
  setShowTitle: (value: boolean) => void;
  setBorderColor: (value: string) => void;
  setTextColor: (value: string) => void;
  setBackgroundColor: (value: string) => void;
  setBorderSize: (value: number) => void;
  setNumberOfRows: (value: number) => void;
  toggleAlbums: (value: boolean) => void;
  toggleTitle: (value: boolean) => void;
  setNumberOfColumns: (value: number) => void;
}

export interface Settings {
  actions: SettingsActions;
  data: SettingsData;
}


export interface ChartActions {
  save: any;
  handleDragEnd: any;
  setDraggedAlbum: any;
  setChartTitle: (title: string) => void;
}

export interface ChartData {
  chartTitle: string;
  entries?: Album[],
  savedChartId: string | null;
}

export interface Chart {
  actions: ChartActions;
  data: ChartData;
  settings: Settings;
}

export interface ChartState {
  chart: Chart;
  listStyles: any;
  mutation: any;
  titleStyle: any;
}