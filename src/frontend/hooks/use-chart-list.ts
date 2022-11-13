import { ChartSettings } from "@prisma/client";
import { useState } from "react";
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

  const saveChart = async (): Promise<string> => {
    const result = await mutation.mutateAsync({
      albums: list,
      name: settings.chartTitle,
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

  const insertAlbumAtIndex = (album: Album, oldIndex: number, newIndex: number) => {
    setList((albums) => {
      const listWithoutAlbum = list.filter((_, albumIndex) => albumIndex !== oldIndex);

      const newAlbums = [...listWithoutAlbum];
      newAlbums.splice(newIndex, 0, album);

      if (albums.length === 0 && newAlbums.length === 1) {
        setIsStarted(true);
      }

      return newAlbums;
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
      },
      state: {
        isSettingsOpen,
        isSearchOpen,
        isFirstCloseDone,
        isActive,
        isLoading: mutation.isLoading,
        isStarted,
        listMode, 
      },
    },
    isLoading: mutation.isLoading,
    isStarted,
    settings,
  };
};

export default useChartList;
