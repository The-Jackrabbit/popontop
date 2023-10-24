import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { NumericExpandingPillContent } from '../../../lib/ExpandingPill/NumericExpandingPill/NumericExpandingPill';
import { Dispatch, SetStateAction } from 'react';
import { Layout } from './Layout';
import { ChartTemplate } from './ChartTemplate/ChartTemplate';

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

export const DesktopPreview = ({
  chart,
  isMobile,
  previewIndex,
  setPreviewIndex,
}: Props) => {
  const values = Object.values(CHART_TEMPLATES);
  const template = values.at(previewIndex) as number[][];
  const rows = transformRows(template);

  return (
    <Layout
      chartTemplate={<ChartTemplate chart={chart} rows={rows} />}
      isMobile={isMobile}
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
