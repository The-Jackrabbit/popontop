import React from 'react';
import {
  ChartListItemLoader,
} from './ChartListItem/ChartListItem';

export const ListOfChartsLoader: React.FC = ({}) => (
  <div className="max-h-[80vh] overflow-y-scroll">
    {[...new Array(100)].map((_, index) => (
      <ChartListItemLoader key={`${index}-chart-list-loader`} />
    ))}
  </div>
);
