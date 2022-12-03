import React from "react";
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
  <div className="px-6 mb-2">
    <div
      className={`
        ${ROW_HEIGHT_WITH_UNIT}
        w-full overflow-hidden 
        last-of-type:border-b-0
        text-neutral-900 dark:text-neutral-50
        flex justify-between gap-2
        my-0
      `}
    >
      {children}
    </div>
  </div>
);

export default Row;
