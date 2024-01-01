import { Over } from '@dnd-kit/core';
import { EMPTY_ALBUM } from '../../../constants/empty-album';
import { ALBUM_RESULTS } from '../../../constants/test-data/search-results';
import { Album } from '../../../types/Albums';
import { DraggedEntry } from '../use-chart/use-chart';
import { updateList } from './use-list';

const getOver = (droppedIndex: number): Over => ({
  id: droppedIndex.toString(),
  rect: {} as ClientRect,
  data: {
    current: {},
  },
  disabled: false,
});

const getDraggedEntry = (
  oldList: Album[],
  originalIndex: number,
  origin: DraggedEntry['origin']
): DraggedEntry => ({
  data: {
    ...(oldList[originalIndex] as Album),
  },
  index: originalIndex,
  origin,
});

describe('updateList', () => {
  describe('from search', () => {
    describe('past length of existing list', () => {
      test('drop onto empty list', () => {
        const droppedIndex = 2;
        const over = getOver(droppedIndex);
        const draggedEntry: DraggedEntry = getDraggedEntry(
          ALBUM_RESULTS,
          0,
          'search'
        );
        const oldList: Album[] = [];
        const newList = updateList(oldList, draggedEntry, over);

        expect(newList).toEqual([EMPTY_ALBUM, EMPTY_ALBUM, ALBUM_RESULTS[0]]);
      });
    });
  });

  describe('from chart', () => {
    describe('onto existing album', () => {
      test('dropping onto a lower index', () => {
        const droppedIndex = 0;
        const originalIndex = 1;
        const over = getOver(droppedIndex);
        const oldList: Album[] = [ALBUM_RESULTS[1], ALBUM_RESULTS[0]];
        const draggedEntry: DraggedEntry = getDraggedEntry(
          oldList,
          originalIndex,
          'chart'
        );
        const newList = updateList(oldList, draggedEntry, over);

        expect(newList.length).toEqual(2);
        expect(newList).toEqual([ALBUM_RESULTS[0], ALBUM_RESULTS[1]]);
      });

      test('dropping into a higher index', () => {
        const droppedIndex = 3;
        const originalIndex = 1;
        const over = getOver(droppedIndex);
        const oldList: Album[] = [
          ALBUM_RESULTS[0],
          ALBUM_RESULTS[3],
          ALBUM_RESULTS[1],
          ALBUM_RESULTS[2],
        ];
        const draggedEntry: DraggedEntry = getDraggedEntry(
          oldList,
          originalIndex,
          'chart'
        );
        const newList = updateList(oldList, draggedEntry, over);

        expect(newList).toEqual([
          ALBUM_RESULTS[0],
          ALBUM_RESULTS[1],
          ALBUM_RESULTS[2],
          ALBUM_RESULTS[3],
        ]);
      });
    });

    describe('onto an empty album', () => {
      test('dropping onto a lower index', () => {
        const droppedIndex = 1;
        const originalIndex = 2;
        const over = getOver(droppedIndex);
        const oldList: Album[] = [
          ALBUM_RESULTS[0],
          EMPTY_ALBUM,
          ALBUM_RESULTS[2],
          ALBUM_RESULTS[3],
        ];
        const draggedEntry: DraggedEntry = getDraggedEntry(
          oldList,
          originalIndex,
          'chart'
        );
        const newList = updateList(oldList, draggedEntry, over);

        expect(newList).toEqual([
          ALBUM_RESULTS[0],
          ALBUM_RESULTS[2],
          EMPTY_ALBUM,
          ALBUM_RESULTS[3],
        ]);
      });

      test('dropping into a higher index', () => {
        const droppedIndex = 2;
        const originalIndex = 1;
        const oldList: Album[] = [
          ALBUM_RESULTS[0],
          ALBUM_RESULTS[2],
          EMPTY_ALBUM,
          ALBUM_RESULTS[3],
        ];
        const over = getOver(droppedIndex);
        const draggedEntry: DraggedEntry = getDraggedEntry(
          oldList,
          originalIndex,
          'chart'
        );
        const newList = updateList(oldList, draggedEntry, over);

        expect(newList).toEqual([
          ALBUM_RESULTS[0],
          EMPTY_ALBUM,
          ALBUM_RESULTS[2],
          ALBUM_RESULTS[3],
        ]);
      });
    });
  });
});
