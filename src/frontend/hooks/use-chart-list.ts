import { ChartSettings } from "@prisma/client";
import { useState } from "react";
import { useSpring } from "react-spring";
import { ListRowMode } from "../../components/lib/Mobile/ListRow/ListRow";
import { Album } from "../../types/Albums";
import { trpc } from '../../utils/trpc';
import useChartSettings from "./use-chart/use-chart-settings";

const useChartList = ({
  chartName = 'My sick ass chart',
  // readonly = false,
  defaultSettings,
}: {
  chartName: string;
  readonly?: boolean;
  defaultSettings: ChartSettings | null;
}) => {
  const mutation = trpc.charts.create.useMutation();
  const settings = useChartSettings(defaultSettings);
  const [list, setList] = useState<Album[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFirstCloseDone, setIsFirstCloseDone] = useState(false);
  const [isActive, setIsActive] = useState(true); 
  const [listMode, setListMode] = useState<ListRowMode>(ListRowMode.NORMAL);
  const [chartTitle, setChartTitle] = useState(chartName);
  const [titleHeightStyle, titleHeightAnimation] = useSpring(() => ({
    height: '250px',
    config: {
      bounce: 2,
      friction: 20,
      mass: 1,
      tension: 200,
    },
  }));
  
  const toggleTitle = () => {
    if (isStarted) {
      setIsFirstCloseDone(true);
      const cHeight =  titleHeightStyle.height.get();
      const height = cHeight === '60px' ? '0px' : '60px';
      titleHeightAnimation.start({ height });
    }
  };

  const saveChart = async (): Promise<string> => {
    const result = await mutation.mutateAsync({
      albums: list,
      name: chartTitle,
      settings: {
        backgroundColor: settings.backgroundColor,
        borderColor: settings.borderColor,
        borderSize: settings.borderSize,
        showAlbums: settings.showAlbums,
        showTitle: settings.showTitle,
        textColor: settings.textColor,
      },
    });

    return result.chart.uuid ?? '';
  };

  const removeAlbumAtIndex= (index: number) => {
    setList((list) =>{
      const newAlbums = [...list];
      newAlbums.splice(index, 1);

      return newAlbums;
    });
  };

  const advanceAlbumAtIndex= (index: number) => {
    const newAlbums = [...list];
    if (index === 0) {
      return;
    }
    const temp = newAlbums[index] as Album;
    newAlbums[index] = newAlbums[index-1] as Album;
    newAlbums[index - 1] = temp as Album;

    setList(newAlbums);
  };

  const lowerAlbumAtIndex= (index: number) => {
    const newAlbums = [...list];
    if (index === list.length - 1) {
      return;
    }
    const temp = newAlbums[index] as Album;
    newAlbums[index] = newAlbums[index+1] as Album;
    newAlbums[index + 1] = temp as Album;

    setList(newAlbums);
  };

  const addAlbumToList = (album: Album) => {
    setList((albums) => {
      const newAlbums = [...albums];
      newAlbums.push(album);

      if (albums.length === 0 && newAlbums.length === 1) {
        setIsStarted(true);
      }

      return newAlbums;
    });
  };

  const insertAlbumAtIndex = (
    album: Album,
    oldIndex: number,
    newIndex: number
  ) => {
    const diff = newIndex - oldIndex;

    if (Math.abs(diff) <= 1) {
      return swapAlbumsAtIndices(oldIndex, newIndex);
    }

    setList((albums) => {
      const newAlbums = [...albums] as (Album | null)[];
      newAlbums[oldIndex] = null;
      newAlbums.splice(newIndex, 0, album);
      
      if (albums.length === 0 && newAlbums.length === 1) {
        setIsStarted(true);
      }

      return newAlbums.filter(el => el !== null) as Album[];
    });
  };

  const swapAlbumsAtIndices = (oldIndex: number, newIndex: number) => {
    setList((albums) => {
      
      const newAlbums = [...albums];
      newAlbums[oldIndex] = albums[newIndex] as Album;
      newAlbums[newIndex] = albums[oldIndex] as Album;

      return newAlbums;
    });
  };

  return {
    list,
    saveChart,
    listMutations: {
      swapAlbumsAtIndices,
      addAlbumToList,
      removeAlbumAtIndex,
      advanceAlbumAtIndex,
      lowerAlbumAtIndex,
      insertAlbumAtIndex,
    },
    editor: {
      actions: {
        setIsSettingsOpen,
        setIsSearchOpen,
        setIsFirstCloseDone,
        setIsActive,
        setListMode,
        // not in love with chart title being in eidtor state vs actual state that also is in the db but eh maybe move later
        setChartTitle,
        toggleTitle,
      },
      state: {
        chartTitle,
        isSettingsOpen,
        isSearchOpen,
        isFirstCloseDone,
        isActive,
        isLoading: mutation.isLoading,
        isStarted,
        listMode, 
        titleHeightStyle,
      },
    },
    isLoading: mutation.isLoading,
    isStarted,
    settings: {
      ...settings,
      setShowTitle: (value: boolean) => {
        settings.setShowTitle(value);
        toggleTitle();
      },
    },
  };
};

export default useChartList;
