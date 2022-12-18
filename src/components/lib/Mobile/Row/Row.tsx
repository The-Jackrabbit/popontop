import React from 'react';
import { ROW_HEIGHT_WITH_UNIT } from '../../../../frontend/hooks/springs/use-disappear-row';

export enum ListRowMode {
  DELETE = 'DELETE',
  NORMAL = 'NORMAL',
  REARRANGE = 'REARRANGE',
  SEARCH = 'SEARCH',
}

export interface Props {
  children: React.ReactNode;
}

export const Row: React.FC<Props> = ({ children }) => (
  <div className="mb-2 px-6">
    <div
      className={`
        ${ROW_HEIGHT_WITH_UNIT}
        my-0 flex 
        w-full
        justify-between gap-2
        overflow-hidden text-neutral-900 last-of-type:border-b-0
        dark:text-neutral-50
      `}
    >
      {children}
    </div>
  </div>
);

export default Row;
