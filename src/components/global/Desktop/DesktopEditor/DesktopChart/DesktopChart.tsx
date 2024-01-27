import React from 'react';
import ChartItem from './ChartItem/ChartItem';
import { EMPTY_ALBUM } from '../../../../../constants/empty-album';
import { ChartTemplate } from '../../DesktopPreview/ChartTemplate/ChartTemplate';
import {
  ChartFormat,
  transformRows,
} from '../../DesktopPreview/DesktopPreview';
import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';
import { CHART_TEMPLATES } from '../../../../../constants/chart-types';

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
  borderColor: string;
  chart: ChartHookNode;
  isReadOnly: boolean;
}

export const DesktopChart: React.FC<Props> = ({
  borderColor,
  chart,
  isReadOnly,
}) => {
  return (
    <ChartTemplate
      itemComponent={({ indexIntoList }) => (
        <ChartItem
          key={`entryin-chart-${indexIntoList}`}
          album={chart.list.state.list.at(indexIntoList) ?? EMPTY_ALBUM}
          borderColor={borderColor}
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
};
export default DesktopChart;
