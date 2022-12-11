import Link from 'next/link';
import { IChartListItem } from '../../../../server/trpc/router/charts/getChartsForUser';
import { ListRowMode } from '../../Mobile/ListRow/ListRow';
import { DeleteRowButton } from '../../Mobile/Row/DeleteRowButton/DeleteRowButton';

export interface Props {
  chart: IChartListItem; 
  listMode: ListRowMode;
  onClick?: () => void;
  onClickDeleteChart: () => void;
}

export const MobileChartListItem: React.FC<Props> = (props) => <ChartListItem {...props} isMobile={false} />;

export const DesktopChartListItem: React.FC<Props> = (props) => <ChartListItem {...props} isMobile={true} />;

export const ChartListItem: React.FC<Props & { isMobile: boolean }> = ({
  chart,
  isMobile,
  listMode,
  onClick,
  onClickDeleteChart,
}) => {
  const contentComponent = (
    <ChartListItemContent
      chart={chart}
      listMode={listMode}
      onClickDeleteChart={onClickDeleteChart}
    />
  );
  
  if (!isMobile && onClick) {
    return <div onClick={onClick}>{contentComponent}</div>;
  }
  
  return <Link href={`/charts/${chart.uuid}`}>{contentComponent}</Link>;
};

export interface ChartListItemContentProps {
  chart: IChartListItem;
  listMode: ListRowMode;
  onClickDeleteChart: () => void;
} 

export const ChartListItemContent: React.FC<ChartListItemContentProps> = ({
  chart,
  listMode,
  onClickDeleteChart,
}) => {
  return (
    <div 
      className="
        flex justify-between
        mb-2
        cursor-pointer
        hover:bg-neutral-300 active:bg-neutral-400
        dark:hover:bg-neutral-800 dark:active:bg-neutral-700
      "
    > 
      <div className="basis-5/6 overflow-x-hidden">
        <p
          className="
            text-2xl truncate
            font-semibold
          "
        >
          {chart.name}
        </p>
        
        <p className='text-xs dark:text-neutral-400 font-light'>
          created: {chart.created_at ? chart.created_at.toDateString() : ''}
        </p>
      </div>
      <div className="basis-1/6">
        {listMode === ListRowMode.DELETE && (
          <DeleteRowButton
            onClick={onClickDeleteChart}
            className="
              h-full w-full
            "
          />
        )}
      </div>
    </div>
  )
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
