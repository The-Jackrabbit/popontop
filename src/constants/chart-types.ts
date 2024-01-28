import {
  ChartFormat,
  ChartFormatKey,
} from '../components/global/Desktop/DesktopPreview/DesktopPreview';

export const chartFormatKeys: ChartFormatKey[] = [
  'honeycomb10',
  'honeycomb',
  'classics',
  'r50',
  'r100',
  'top50',
];
export const CHART_TEMPLATES: Map<ChartFormatKey, ChartFormat> = new Map([
  [
    'honeycomb10',
    {
      chart: [
        [0, 1],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1],
      ],
      list: {
        fontSize: 24,
        columnCount: 1,
        count: 10,
        width: 340,
      },
    },
  ],
  [
    'honeycomb',
    {
      chart: [
        [0, 1],
        [0, 1, 2],
        [0, 1],
      ],
      list: {
        fontSize: 24,
        columnCount: 1,
        count: 7,
        width: 400,
      },
    },
  ],
  [
    'classics',
    {
      chart: [
        [0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4, 5],
        [],
        [0, 1, 2, 3, 4, 5, 6, 7, 8],
        [0, 1, 2, 3, 4, 5, 6, 7, 8],
        [],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      ],
      list: {
        fontSize: 10,
        columnCount: 3,
        count: 100,
        width: 340,
      },
    },
  ],
  [
    'r50',
    {
      chart: [
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4],
      ],
      list: {
        fontSize: 13,
        columnCount: 2,
        count: 50,
        width: 300,
      },
    },
  ],
  [
    'r100',
    {
      chart: [
        [0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
      ],
      list: {
        fontSize: 9,
        columnCount: 3,
        count: 100,
        width: 300,
      },
    },
  ],
  [
    'top50',
    {
      chart: [
        [0, 1, 2, 3],
        [0, 1, 2, 3],
        [],
        [0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4, 5],
        [],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
        [0, 1, 2, 3, 4, 5, 6, 7],
      ],
      list: {
        fontSize: 12,
        columnCount: 2,
        count: 50,
      },
    },
  ],
]);
