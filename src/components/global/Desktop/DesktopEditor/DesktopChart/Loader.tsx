import React from 'react';
import Grid from '../../../../lib/Grid/Grid';
import { EMPTY_ALBUM } from '../../../../../constants/empty-album';
import { ChartItemLoader } from './ChartItem/Loader';

interface Props {
  numberOfEntries: number;
}

const Loader: React.FC<Props> = ({ numberOfEntries }) => {
  const list = [...new Array(numberOfEntries)].map(() => EMPTY_ALBUM);
  return (
    <Grid
      borderSize={1}
      borderColor=""
      items={list}
      itemComponent={({ index }) => (
        <div key={`grid-item-loader-${index}`}>
          <ChartItemLoader index={index} />
        </div>
      )}
    />
  );
};

export const DesktopChartLoader = Loader;
