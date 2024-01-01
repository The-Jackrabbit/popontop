import React from 'react';
import { Album } from '../../../../../types/Albums';
import ChartItem from './ChartItem/ChartItem';
import Grid from '../../../../lib/Grid/Grid';
import { EMPTY_ALBUM } from '../../../../../constants/empty-album';
import { ChartTemplate } from '../../DesktopPreview/ChartTemplate/ChartTemplate';
import {
  ChartFormat,
  CHART_TEMPLATES,
  CHART_TEMPLATE_VALUES,
  transformRows,
} from '../../DesktopPreview/DesktopPreview';
import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';

export function getBorderSizes(index: number): string {
  let borderSizes = '';

  if (index % 2 === 0) {
    borderSizes += ' border-l-8';
  } else {
    borderSizes += ' border-l-4';
  }

  if (index % 2 === 1) {
    borderSizes += ' border-r-8';
  } else {
    borderSizes += ' border-r-4';
  }

  if (index < 2) {
    borderSizes += ' border-t-8';
  } else {
    borderSizes += ' border-t-4';
  }

  if (index > 10 - 1 - 2) {
    borderSizes += ' border-b-8';
  } else {
    borderSizes += ' border-b-4';
  }

  return borderSizes; // 'border-l-4 border border-black';
}

export interface Props {
  chart: ChartHookNode;
  borderColor: string;
  borderSize: number;
  isReadOnly: boolean;
  items: Album[];
}

export const DesktopChart: React.FC<Props> = ({
  chart,
  borderColor,
  borderSize,
  isReadOnly,
  items,
}) => (
  <ChartTemplate
    itemComponent={({ indexIntoList, lengthOfCurrentRow }) => (
      <ChartItem
        key={`entryin-chart-${indexIntoList}`}
        albumsInRow={lengthOfCurrentRow}
        album={chart.list.state.list.at(indexIntoList) ?? EMPTY_ALBUM}
        borderColor={borderColor}
        borderSizes={getBorderSizes(indexIntoList)}
        index={indexIntoList}
        isReadOnly={isReadOnly}
      />
    )}
    isMobile={false}
    chart={chart}
    rows={transformRows(
      (CHART_TEMPLATES.get(chart.settings.state.chartFormat) as ChartFormat)
        .chart
    )}
  />
);

export default DesktopChart;
