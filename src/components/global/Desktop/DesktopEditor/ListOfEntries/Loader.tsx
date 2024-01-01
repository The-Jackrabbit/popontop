import React from 'react';
import { EMPTY_ALBUM } from '../../../../../constants/empty-album';
import { ListColumnLoader } from './ListColumn/Loader';

interface Props {
  numberOfEntries: number;
}

const Loader: React.FC<Props> = ({ numberOfEntries }) => {
  const list = [...new Array(numberOfEntries)].map(() => EMPTY_ALBUM);

  return (
    <div
      className="
      oveflow-x-hidden
      flex
      text-ellipsis whitespace-nowrap pl-8 text-[9px]
      text-[rgb(212_212_212)]
      dark:text-neutral-50
    "
      role="list"
    >
      {[...new Array(1)].map((_, index) => (
        <ListColumnLoader
          key={index + 'list-column'}
          list={list}
          startIndexOfColumn={0}
        />
      ))}
    </div>
  );
};

export const ListOfEntriesLoader = Loader;
