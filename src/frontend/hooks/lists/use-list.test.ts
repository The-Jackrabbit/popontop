import { Over } from '@dnd-kit/core';
import { EMPTY_ALBUM } from '../../../constants/empty-album';
import { ALBUM_RESULTS } from '../../../constants/test-data/search-results';
import { Album } from '../../../types/Albums';
import { DraggedAlbum } from '../use-chart/use-chart';
import { updateList } from './use-list';

const getOver = (droppedIndex: number): Over => ({
  id: droppedIndex.toString(),
  rect: {} as ClientRect,
  data: {
    current: {},
  },
  disabled: false,
});

describe('updateList', () => {
  test('drop onto empty list', () => {
    const droppedIndex = 2;
    const over = getOver(droppedIndex);
    const draggedAlbum: DraggedAlbum = {
      data: {
        ...ALBUM_RESULTS[0],
      },
      index: 0,
      origin: 'search',
    };
    const oldList: Album[] = [];
    const newList = updateList(oldList, draggedAlbum, over);

    expect(newList).toEqual([
      ALBUM_RESULTS[0],
      ALBUM_RESULTS[0],
      ALBUM_RESULTS[1],
    ]);
  });
  test('drop onto empty spot', () => {
    const droppedIndex = 1;
    const over = getOver(droppedIndex);
    const draggedAlbum: DraggedAlbum = {
      data: {
        ...ALBUM_RESULTS[0],
      },
      index: 0,
      origin: 'chart',
    };
    const oldList: Album[] = [ALBUM_RESULTS[0], EMPTY_ALBUM, ALBUM_RESULTS[1]];
    const newList = updateList(oldList, draggedAlbum, over);

    expect(newList).toEqual([
      ALBUM_RESULTS[0],
      ALBUM_RESULTS[0],
      ALBUM_RESULTS[1],
    ]);
  });
});
