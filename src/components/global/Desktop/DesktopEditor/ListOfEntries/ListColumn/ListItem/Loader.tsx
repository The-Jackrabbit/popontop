import React from 'react';
import { DESKTOP_CHART_FONT_SIZE } from '../../../../../../../constants/sizes';

export interface Props {
  index: number;
}

export const Loader: React.FC<Props> = ({ index }) => (
  <div
    className={`
      ${DESKTOP_CHART_FONT_SIZE}
      animate-pulse
      overflow-hidden text-ellipsis
      whitespace-pre-wrap
      font-mono
      leading-tight
      dark:text-neutral-600
    `}
    role="listitem"
  >
    {index + 1} ...............
  </div>
);

export default Loader;
export const ListItemLoader = Loader;
