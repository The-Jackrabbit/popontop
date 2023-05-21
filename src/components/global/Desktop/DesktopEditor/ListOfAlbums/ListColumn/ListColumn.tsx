import React from 'react';
import { Album } from '../../../../../../types/Albums';
import ListItem from './ListItem/ListItem';

export interface Props {
  className: string;
  list: Album[];
  startIndexOfColumn: number;
  textColor: string;
}

export const ListColumn: React.FC<Props> = ({
  className = '',
  list,
  startIndexOfColumn,
  textColor,
}) => {
  return (
    <div className={className}>
      {list.map((listItem, index) => (
        <ListItem
          key={index + 'list-item'}
          listItem={listItem}
          index={startIndexOfColumn + index}
          textColor={textColor}
        />
      ))}
    </div>
  );
};

export default ListColumn;
