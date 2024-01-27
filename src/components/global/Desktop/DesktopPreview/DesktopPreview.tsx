import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { Layout } from './Layout';
import { ChartTemplate } from './ChartTemplate/ChartTemplate';
import Title from '../../../lib/Title/Title';
import ListOfEntries from '../DesktopEditor/ListOfEntries/ListOfEntries';
import { AlbumOverlay } from '../../MobileEditor/ScreenShot/ScreenShot';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';
import { CHART_TEMPLATES } from '../../../../constants/chart-types';

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
        chart.settings.state.showEntries ? (
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
