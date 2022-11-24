import Link from 'next/link';
import { IChartListItem } from '../../../../server/trpc/router/charts/getChartsForUser';
import { ListRowMode } from '../../Mobile/ListRow/ListRow';
import { DeleteRowButton } from '../../Mobile/Row/DeleteRowButton/DeleteRowButton';

export interface Props {
  chart: IChartListItem; 
  listMode: ListRowMode;
  onClick: () => void;
}

export const ChartListItem: React.FC<Props> = ({chart, listMode, onClick }) => {
  return (
    <Link href={`/mobile/charts/${chart.uuid}`}>
      <div 
        className="
          flex justify-between
          mb-2 h-16
          cursor-pointer
          hover:bg-neutral-300 active:bg-neutral-400
          dark:hover:bg-neutral-800 dark:active:bg-neutral-700
        "
      > 
        <div className="basis-5/6">
          <p className="text-2xl font-semibold">{chart.name}</p>
          <p className='text-xs dark:text-neutral-400 font-light'>
            created: {chart.created_at ? chart.created_at.toDateString() : ''}
          </p>
        </div>
        <div className="basis-1/6">
          {listMode === ListRowMode.DELETE && (
            <DeleteRowButton
              onClick={onClick}
              className="
                h-full w-full
              "
            />
          )}
        </div>
      </div>
    </Link>
  );
}

export const ChartListItemLoader: React.FC = () => (
  <div
    className="
      flex justify-between
      mb-2 h-16
      cursor-pointer
      hover:bg-neutral-300 active:bg-neutral-400
      dark:hover:bg-neutral-800 dark:active:bg-neutral-700
    "
  > 
    <div className="basis-full">
      <p
        className="
          animate-pulse text-2xl w-full bg-neutral-200 dark:bg-neutral-700
          h-[36px]
        "
      />
      <p
        className="
          animate-pulse text-xs mt-1 w-36 h-[16px] bg-neutral-200 dark:bg-neutral-700
        "
      />
    </div>
  </div>
);
