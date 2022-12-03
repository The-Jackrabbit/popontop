import { DragEndEvent } from "@dnd-kit/core";
import { Dispatch, SetStateAction, useState } from "react";
import { EMPTY_ALBUM } from "../../../constants/empty-album";
import { Album } from "../../../styles/types/Albums";
import { HookNode } from "../hook-node";
import { DraggedAlbum } from "../use-chart/use-chart";

export type ListHookNode = HookNode<State, Actions>;

export type State = Album[];

export interface Actions {
  addAlbumToList: (album: Album) => void;
  advanceAlbumAtIndex: (index: number) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  insertAlbumAtIndex:  (
    album: Album,
    oldIndex: number,
    newIndex: number
  ) => void;
  lowerAlbumAtIndex: (index: number) => void;
  removeAlbumAtIndex: (index: number) => void;
  setDraggedAlbum: Dispatch<SetStateAction<DraggedAlbum>>;
  setList: (list: Album[]) => void;
  swapAlbumsAtIndices: (oldIndex: number, newIndex: number) => void;
}

const useList = (initialList: Album[] = []): ListHookNode => {
  const [list, setList] = useState<Album[]>(initialList);
  const [draggedAlbum, setDraggedAlbum] = useState<DraggedAlbum>({
    data: EMPTY_ALBUM,
    origin: 'search',
    index: -1,
  });
  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    if (!over) { return; }
    
    const droppedIndex = over ? parseInt(over.id as string) : -1;

    setList((oldList) => {
      const newContainers = [...oldList];
      if (newContainers.length < droppedIndex) {
        for (let i = newContainers.length ; i < droppedIndex + 1 ; i++) {
          newContainers.push(EMPTY_ALBUM);
        }       
      }
      if (draggedAlbum.origin === 'chart') {
        newContainers[draggedAlbum.index] = EMPTY_ALBUM; 
      }

      if (droppedIndex !== -1) {
        
        newContainers.splice(droppedIndex, 1, draggedAlbum.data);
      }

      return newContainers;
    });
  };

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

  return {
    actions: {
      addAlbumToList,
      advanceAlbumAtIndex,
      handleDragEnd,
      insertAlbumAtIndex,
      lowerAlbumAtIndex,
      removeAlbumAtIndex,
      setDraggedAlbum,
      setList,
      swapAlbumsAtIndices,
    },
    state: list,
  };
};

export default useList;
