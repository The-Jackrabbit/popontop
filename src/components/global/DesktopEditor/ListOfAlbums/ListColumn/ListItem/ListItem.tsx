import React from 'react';
import { Album } from '../../../../../../types/Albums';

export interface Props {
  index: number;
  listItem: Album;
  textColor: string;
}

export const ListItem: React.FC<Props> = ({ index, listItem, textColor }) => {
  const itemDescription = `${index} ${listItem.artist} - ${listItem.name}`;

  return (
    <div
      className={`
        //
        DESKTOP_CHART_FONT_SIZE overflow-hidden
        text-ellipsis
        whitespace-pre-wrap
        font-mono
        text-[22px] leading-tight
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
