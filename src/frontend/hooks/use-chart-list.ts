import { ChartSettings } from "@prisma/client";
import { useState } from "react";
import { Album } from "../../types/Albums";
import { trpc } from '../../utils/trpc';

const useChartList = ({
  chartName = 'My sick ass chart',
  // readonly = false,
  settings,
}: {
  chartName: string;
  readonly?: boolean;
  settings: ChartSettings | null;
}) => {
  const mutation = trpc.charts.create.useMutation();
  const [list, setList] = useState<Album[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(settings?.background_color ?? '');
  const [borderColor, setBorderColor] = useState(settings?.border_color ?? '');
  const [borderSize, setBorderSize] = useState(1);
  const [showAlbums, setShowAlbums] = useState(settings?.show_albums ? settings?.show_albums : false);
  const [chartTitle, setChartTitle] = useState(chartName ?? '');
  const [textColor, setTextColor] = useState(settings?.text_color ?? '');
  const [showTitle, setShowTitle] = useState(settings?.show_title ?? false);

  const saveChart = async (): Promise<string> => {
    const result = await mutation.mutateAsync({
      name: chartTitle,
      albums: list,
      settings: {
        backgroundColor,
        borderColor,
        borderSize,
        showAlbums,
        showTitle,
        textColor,
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

  return {
    addAlbumToList,
    chartTitle,
    list,
    saveChart,
    removeAlbumAtIndex,
    advanceAlbumAtIndex,
    lowerAlbumAtIndex,
    insertAlbumAtIndex,
    isLoading: mutation.isLoading,
    isStarted,
    setChartTitle,
    backgroundColor,
    setBackgroundColor,
    borderColor,
    setBorderColor,
    borderSize,
    setBorderSize,
    showAlbums,
    setShowAlbums,
    textColor,
    setTextColor,
    showTitle,
    setShowTitle,
  }
};

export default useChartList;
