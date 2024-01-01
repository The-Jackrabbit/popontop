import { DragEndEvent, Over } from '@dnd-kit/core';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { EMPTY_ALBUM } from '../../../constants/empty-album';
import { ALBUM_RESULTS } from '../../../constants/test-data/search-results';
import { Album } from '../../../types/Albums';
import { HookNode } from '../../../types/singletons';
import { DraggedAlbum } from '../use-chart/use-chart';

export type ListHookNode = HookNode<State, Actions>;
export function randomIntegerInRange(min: number, max: number): number {
  // Generate a random number in the range [min, max]
  const randomNumber = Math.random() * (max - min + 1) + min;

  // Return the random number as an integer
  return Math.floor(randomNumber);
}
export interface State {
  draggedAlbum: DraggedAlbum | null;
  list: Album[];
}
export interface Actions {
  addAlbumToList: (album: Album) => void;
  advanceAlbumAtIndex: (index: number) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  insertAlbumAtIndex: (
    album: Album,
    oldIndex: number,
    newIndex: number
  ) => void;
  lowerAlbumAtIndex: (index: number) => void;
  removeAlbumAtIndex: (index: number) => void;
  setDraggedAlbum: Dispatch<SetStateAction<DraggedAlbum | null>>;
  setList: (list: Album[]) => void;
  swapAlbumsAtIndices: (oldIndex: number, newIndex: number) => void;
}

export const testlist = [...new Array(100)].map(
  () => ALBUM_RESULTS[randomIntegerInRange(0, 9)]
);
export function isEmptyAlbum(album: Album) {
  return (
    album.artist === EMPTY_ALBUM.artist &&
    album.imageUrl === EMPTY_ALBUM.imageUrl &&
    album.lastfmId === EMPTY_ALBUM.lastfmId &&
    album.name === EMPTY_ALBUM.name
  );
}
export const initializeEmptyList = (): Album[] =>
  [...new Array(0)].map(() => EMPTY_ALBUM);

/**
 *  {droppedIndex: 7, droppedIndexOverListLength: true, droppingOverExistingAlbum: false, albumComingFromSearch: false}
 */
export const updateList = (
  oldList: Album[],
  draggedAlbum: DraggedAlbum,
  over: Over,
  logMetadata = !false
) => {
  const newContainers = [...oldList];
  const droppedIndex = over ? parseInt(over.id as string) : -1;
  const droppedIndexOverListLength = droppedIndex >= newContainers.length;
  const originalIndex =
    draggedAlbum.origin === 'chart' ? draggedAlbum.index : null;
  const droppingOverExistingAlbum: boolean =
    !droppedIndexOverListLength &&
    newContainers[droppedIndex] !== undefined &&
    !isEmptyAlbum(newContainers[droppedIndex] as Album);
  const albumComingFromSearch = draggedAlbum.origin === 'search';

  if (logMetadata) {
    console.log({
      droppedIndex,
      droppedIndexOverListLength,
      droppingOverExistingAlbum,
      albumComingFromSearch,
    });
  }

  if (over.id === 'delete') {
    if (albumComingFromSearch) {
      return newContainers;
    }
    newContainers[draggedAlbum.index] = { ...EMPTY_ALBUM };

    return newContainers;
  }

  if (albumComingFromSearch) {
    if (droppingOverExistingAlbum) {
      // shift existing album down
      newContainers.splice(droppedIndex, 0, draggedAlbum.data);
    } else {
      if (droppedIndexOverListLength) {
        // fill until at index, then insert
        for (let i = newContainers.length; i < droppedIndex; i++) {
          newContainers.push({ ...EMPTY_ALBUM });
        }
        newContainers.push(draggedAlbum.data);
      } else {
        // insert at location (aka replace empty_album with dragged_album)
        newContainers[droppedIndex] = draggedAlbum.data;
      }
    }
  } else {
    if (originalIndex === null) {
      // technically this block will never be reached, this is to make ts happy
      return newContainers;
    }

    if (droppingOverExistingAlbum) {
      // dropping onto a lower index
      if (droppedIndex < originalIndex) {
        // shift existing album down
        newContainers[originalIndex] = { ...EMPTY_ALBUM };
        newContainers.splice(originalIndex, 1);
        newContainers.splice(droppedIndex, 0, draggedAlbum.data);
      } else {
        // delete album at original index
        newContainers.splice(originalIndex, 1);
        newContainers.splice(droppedIndex, 0, draggedAlbum.data);
      }
    } else {
      if (droppedIndexOverListLength) {
        // fill until at index, then insert
        for (let i = newContainers.length; i < droppedIndex; i++) {
          newContainers.push({ ...EMPTY_ALBUM });
        }
        newContainers.push(draggedAlbum.data);
        newContainers[originalIndex] = { ...EMPTY_ALBUM };
      } else {
        // insert at location (aka replace empty_album with dragged_album)
        newContainers[originalIndex] = { ...EMPTY_ALBUM };
        newContainers[droppedIndex] = draggedAlbum.data;
      }
    }
  }

  return newContainers;
};

const useList = (initialList: Album[], ismobile: boolean): ListHookNode => {
  const [list, setList] = useState<Album[]>(
    initialList ?? initializeEmptyList()
  );
  const [draggedAlbum, setDraggedAlbum] = useState<DraggedAlbum | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedAlbum(null);
    const { over } = event;

    if (!over) {
      return;
    }
    if (!draggedAlbum) {
      return;
    }

    setList((oldList) => updateList(oldList, draggedAlbum, over));
  };

  const removeAlbumAtIndex = (index: number) => {
    setList((list) => {
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
    newAlbums[index] = newAlbums[index - 1] as Album;
    newAlbums[index - 1] = temp as Album;

    setList(newAlbums);
  };

  const lowerAlbumAtIndex = (index: number) => {
    const newAlbums = [...list];
    if (index === list.length - 1) {
      return;
    }
    const temp = newAlbums[index] as Album;
    newAlbums[index] = newAlbums[index + 1] as Album;
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

      return newAlbums.filter((el) => el !== null) as Album[];
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
    state: {
      draggedAlbum,
      list,
    },
  };
};

export default useList;
