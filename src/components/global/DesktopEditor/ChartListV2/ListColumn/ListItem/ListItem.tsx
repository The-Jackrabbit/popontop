import React from 'react';
import { Album } from '../../../../../../styles/types/Albums';

export interface Props {
  listItem: Album;
}

export const ListItem: React.FC<Props> = ({ listItem }) => {
  return (
    <div
      className="
      w-14 overflow-hidden text-ellipsis leading-tight
      sm:w-24 md:w-64 lg:w-72
    "
      role="listitem"
    >
      {listItem.artist} - {listItem.name}
    </div>
  );
};

export default ListItem;
