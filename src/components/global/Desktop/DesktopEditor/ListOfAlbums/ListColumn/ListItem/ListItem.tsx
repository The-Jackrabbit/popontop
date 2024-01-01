import React from 'react';
import { DESKTOP_CHART_FONT_SIZE } from '../../../../../../../constants/sizes';
import { ChartHookNode } from '../../../../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../../../../types/Albums';
import { CHART_TEMPLATES } from '../../../../DesktopPreview/DesktopPreview';

export interface Props {
  chart: ChartHookNode;
  index: number;
  listItem: Album;
  textColor: string;
}

export const ListItem: React.FC<Props> = ({
  chart,
  index,
  listItem,
  textColor,
}) => {
  const itemDescription = `${index} ${listItem.artist} - ${listItem.name}`;

  return (
    <div
      className={`
        ${DESKTOP_CHART_FONT_SIZE} overflow-hidden
        text-[${
          CHART_TEMPLATES.get(chart.settings.state.chartFormat)?.list.fontSize
        }px]
        text-ellipsis
        whitespace-pre-wrap
        font-mono
        leading-tight
        dark:text-neutral-600
      `}
      role="listitem"
      style={{ color: textColor }}
    >
      {itemDescription}
    </div>
  );
};

export default ListItem;
