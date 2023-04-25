import React from 'react';

export interface Props {
  index: number;
}

export const Loader: React.FC<Props> = ({ index }) => (
  <div
    className={`
      overflow-hidden
      text-ellipsis
      leading-tight
      // DESKTOP_CHART_FONT_SIZE
      text-[14px]
      font-mono
      whitespace-pre-wrap
      animate-pulse
    `}
    role="listitem"
  >
    {index+1} - ...
  </div>
);

export default Loader;
export const ListItemLoader = Loader;

