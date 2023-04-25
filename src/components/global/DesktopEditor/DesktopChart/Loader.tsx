import React from 'react';
import Grid from '../../../lib/Grid/Grid';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';
import { ChartItemLoader } from './ChartItem/Loader';

export interface Props {
  borderColor: string;
  borderSize: number;
  isReadOnly: boolean;
}

const list = [...new Array(20)].map(() => EMPTY_ALBUM);

const Loader: React.FC = () => {
  return (
    <Grid
      borderSize={1}
      borderColor=""
      items={list}
      itemComponent={({ index }) => (
        <ChartItemLoader index={index} />
      )}
    />
  );
};

export const DesktopChartLoader = Loader;
