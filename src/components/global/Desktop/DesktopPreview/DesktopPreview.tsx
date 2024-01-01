import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { Layout } from './Layout';
import { ChartTemplate } from './ChartTemplate/ChartTemplate';
import Title from '../../../lib/Title/Title';
import ListOfEntries from '../DesktopEditor/ListOfEntries/ListOfEntries';
import { AlbumOverlay } from '../../MobileEditor/ScreenShot/ScreenShot';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';

export interface Props {
  chart: ChartHookNode;
  isMobile: boolean;
  previewIndex: number;
}

export const transformRows = (rows: number[][]): number[][] => {
  const trows: number[][] = [];
  let currentLength = 0;
  rows.forEach((row) => {
    const transformedRow = row.map((n) => n + currentLength);
    trows.push(transformedRow);
    currentLength += transformedRow.length;
  });

  return trows;
};

export type ChartFormatKey =
  | 'honeycomb10'
  | 'honeycomb'
  | 'classics'
  | 'r50'
  | 'r100'
  | 'top50';

export interface ChartFormat {
  chart: number[][];
  list: {
    fontSize: number;
    columnCount: number;
    count: number;
  };
}

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
        fontSize: 12,
        columnCount: 1,
        count: 10,
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
        fontSize: 7,
        columnCount: 2,
        count: 100,
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
      ],
      list: {
        fontSize: 10,
        columnCount: 2,
        count: 50,
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
        columnCount: 2,
        count: 100,
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
        columnCount: 1,
        count: 50,
      },
    },
  ],
]);

const values = Object.values(CHART_TEMPLATES);
export const CHART_TEMPLATE_VALUES = values;

export const DesktopPreview = ({ chart, isMobile, previewIndex }: Props) => {
  const template = values
    .map((template) => template.chart)
    .at(previewIndex) as number[][];
  const rows = transformRows(template);

  return (
    <Layout
      title={
        chart.settings.state.showTitle ? (
          <Title
            backgroundColor={chart.settings.state.titleBackgroundColor}
            chartTitle={chart.state.chartTitle}
            isReadOnly={false}
            setValue={chart.actions.setChartTitle}
            showIntroduction={!true}
            textColor={chart.settings.state.textColor}
          />
        ) : null
      }
      chartTemplate={
        <ChartTemplate
          itemComponent={({ indexIntoList, lengthOfCurrentRow }) => (
            <AlbumOverlay
              album={chart.list.state.list.at(indexIntoList) ?? EMPTY_ALBUM}
              albumOverlayColor={
                chart.settings.state.albumOverlayColor === ''
                  ? undefined
                  : chart.settings.state.albumOverlayColor
              }
              count={lengthOfCurrentRow}
              key={`album-${indexIntoList}`}
              isMobile={isMobile}
              textColor={chart.settings.state.textColor}
            />
          )}
          isMobile={isMobile}
          chart={chart}
          rows={rows}
        />
      }
      isMobile={isMobile}
      list={
        chart.settings.state.showAlbums ? (
          <ListOfEntries
            chart={chart}
            textColor={chart.settings.state.textColor}
            columnCount={1}
          />
        ) : null
      }
      previewNavigator={null}
    />
  );
};
