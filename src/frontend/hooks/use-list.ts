import { useEffect, useState } from "react";
import { Album } from "../../styles/types/Albums";

export interface UseListState {
  list: Album[];
  mutations: {
    addAlbumToList: (album: Album) => void;
    advanceAlbumAtIndex: (index: number) => void;
    insertAlbumAtIndex:  (
      album: Album,
      oldIndex: number,
      newIndex: number
    ) => void;
    lowerAlbumAtIndex: (index: number) => void;
    removeAlbumAtIndex: (index: number) => void;
    setList: (list: Album[]) => void;
    swapAlbumsAtIndices: (oldIndex: number, newIndex: number) => void;
  };
}

const useList = (initialList: Album[] = []): UseListState => {
  const [list, setList] = useState<Album[]>(initialList);

  const removeAlbumAtIndex = (index: number) => {
    setList((list) =>{
      const newAlbums = [...list];
      newAlbums.splice(index, 1);

      return newAlbums;
    });
  };

  const advanceAlbumAtIndex = (index: number) => {
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
  useEffect(() => {
    console.log({ list })
  }, [list]);
  return {
    list,
    mutations: {
      addAlbumToList,
      advanceAlbumAtIndex,
      insertAlbumAtIndex,
      lowerAlbumAtIndex,
      removeAlbumAtIndex,
      setList,
      swapAlbumsAtIndices,
    },
  };
};

export default useList;
