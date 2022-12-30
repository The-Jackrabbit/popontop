import React from 'react';
import { Album } from '../../../../../../styles/types/Albums';

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
        w-52 overflow-hidden
        text-ellipsis
        leading-tight
        sm:w-56 md:w-64 lg:w-72
      "
      role="listitem"
      style={{ color: textColor }}
    >
      {itemDescription}
    </div>
  );
};

export default ListItem;
