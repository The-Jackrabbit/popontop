import React from 'react';
import Grid from '../../../../lib/Grid/Grid';
import { EMPTY_ALBUM } from '../../../../../constants/empty-album';
import { ChartItemLoader } from './ChartItem/Loader';

interface Props {
  numberOfAlbums: number;
}

const Loader: React.FC<Props> = ({ numberOfAlbums }) => {
  const list = [...new Array(numberOfAlbums)].map(() => EMPTY_ALBUM);
  return (
    <Grid
      borderSize={1}
      borderColor=""
      items={list}
      itemComponent={({ index }) => <ChartItemLoader index={index} />}
    />
  );
};

export const DesktopChartLoader = Loader;
