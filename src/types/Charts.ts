import { ChartSettings } from '@prisma/client';
import { Album } from './Albums';

export interface Chart {
  name: string;
  albums: Album[];
  settings: ChartSettings | null;
  uuid: string;
}

export type WritableChartSettings = Omit<
  Omit<ChartSettings, 'chart_id'>,
  'uuid'
>;
