import { useState } from "react";
import { Album } from "../../types/Albums";
import { trpc } from '../../utils/trpc';

const useChartList = () => {
  const [chartTitle, setChartTitle] = useState('My sick ass chart');
  const mutation = trpc.charts.create.useMutation();
  const [list, setList] = useState<Album[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const saveChart = async (): Promise<string> => {
    const t = { name: chartTitle, albums: list };
    console.log({ t })
    const result = await mutation.mutateAsync(t);

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

  return {
    addAlbumToList,
    chartTitle,
    list,
    saveChart,
    removeAlbumAtIndex,
    advanceAlbumAtIndex,
    lowerAlbumAtIndex,
    isLoading: mutation.isLoading,
    isStarted,
    setChartTitle,
  }
};

export default useChartList;
