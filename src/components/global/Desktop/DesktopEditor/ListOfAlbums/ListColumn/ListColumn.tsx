import React from 'react';
import { EMPTY_ALBUM } from '../../../../../../constants/empty-album';
import { ChartHookNode } from '../../../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../../../types/Albums';
import { CHART_TEMPLATES } from '../../../DesktopPreview/DesktopPreview';
import ListItem from './ListItem/ListItem';

export interface Props {
  chart: ChartHookNode;
  className: string;
  list: Album[];
  startIndexOfColumn: number;
  textColor: string;
}

export const ListColumn: React.FC<Props> = ({
  chart,
  className = '',
  startIndexOfColumn,
  textColor,
}) => {
  return (
    <div className={className}>
      {Array(CHART_TEMPLATES.get(chart.settings.state.chartFormat)?.list.count)
        .fill(null)
        .map((_, index) => (
          <ListItem
            chart={chart}
            key={index + 'list-item'}
            listItem={
              chart.list.state.list[index]
                ? (chart.list.state.list[index] as Album)
                : EMPTY_ALBUM
            }
            index={startIndexOfColumn + index}
            textColor={textColor}
          />
        ))}
    </div>
  );
};

export default ListColumn;
