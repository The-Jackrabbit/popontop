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
      className="
        overflow-hidden
        text-ellipsis
        leading-tight
      "
      role="listitem"
      style={{ color: textColor }}
    >
      {itemDescription}
    </div>
  );
};

export default ListItem;
