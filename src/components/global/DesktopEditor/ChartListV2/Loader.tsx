import React from 'react';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';
import { ListColumnLoader } from './ListColumn/Loader';

const list = [...new Array(20)].map(() => EMPTY_ALBUM);

const Loader: React.FC = () => (
  <div
    className="
      oveflow-x-hidden
      flex
      text-ellipsis whitespace-nowrap text-[9px] dark:text-neutral-50
      pl-8
      text-[rgb(212_212_212)]
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

export const ChartListV2Loader = Loader;
