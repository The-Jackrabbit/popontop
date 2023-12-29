import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { NumericExpandingPillContent } from '../../../lib/ExpandingPill/NumericExpandingPill/NumericExpandingPill';
import { Dispatch, SetStateAction } from 'react';
import { Layout } from './Layout';
import { ChartTemplate } from './ChartTemplate/ChartTemplate';
import Title from '../../../lib/Title/Title';
import ListOfAlbums from '../DesktopEditor/ListOfAlbums/ListOfAlbums';

export interface Props {
  chart: ChartHookNode;
  isMobile: boolean;
  previewIndex: number;
  setPreviewIndex?: Dispatch<SetStateAction<number>>;
}

const transformRows = (rows: number[][]): number[][] => {
  const trows: number[][] = [];
  let currentLength = 0;
  rows.forEach((row) => {
    const transformedRow = row.map((n) => n + currentLength);
    trows.push(transformedRow);
    currentLength += transformedRow.length;
  });

  console.log({ currentLength });

  return trows;
};

export const CHART_TEMPLATES = {
  honeycomb10: [
    [0, 1],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1],
  ],
  classics: [
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
  r50: [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
  ],
  r100: [
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
  top50: [
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
};
const values = Object.values(CHART_TEMPLATES);
export const CHART_TEMPLATE_VALUES = values;

export const DesktopPreview = ({
  chart,
  isMobile,
  previewIndex,
  setPreviewIndex,
}: Props) => {
  const template = values.at(previewIndex) as number[][];
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
        <ChartTemplate isMobile={isMobile} chart={chart} rows={rows} />
      }
      isMobile={isMobile}
      list={
        chart.settings.state.showAlbums ? (
          <ListOfAlbums
            textColor={chart.settings.state.textColor}
            columnCount={1}
            list={chart.state.numberedList}
          />
        ) : null
      }
      previewNavigator={
        setPreviewIndex ? (
          <NumericExpandingPillContent
            max={values.length - 1}
            min={0}
            setValue={setPreviewIndex}
            textColor={chart.settings.state.textColor}
            value={previewIndex}
          />
        ) : null
      }
    />
  );
};
