import Link from 'next/link';
import { IChartListItem } from '../../../../server/trpc/router/charts/getChartsForUser';
import { ListRowMode } from '../../Mobile/ListRow/ListRow';
import { DeleteRowButton } from '../../Mobile/Row/DeleteRowButton/DeleteRowButton';

export interface Props {
  isActive: boolean;
  chart: IChartListItem;
  listMode: ListRowMode;
  onClick?: () => void;
  onClickDeleteChart: () => void;
}

export const MobileChartListItem: React.FC<Props> = (props) => (
  <ChartListItem {...props} isMobile={false} />
);

export const DesktopChartListItem: React.FC<Props> = (props) => (
  <ChartListItem {...props} isMobile={true} />
);

export const ChartListItem: React.FC<Props & { isMobile: boolean }> = ({
  chart,
  isActive,
  isMobile,
  listMode,
  onClick,
  onClickDeleteChart,
}) => {
  const contentComponent = (
    <ChartListItemContent
      isActive={isActive}
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
  isActive: boolean;
  chart: IChartListItem;
  listMode: ListRowMode;
  onClickDeleteChart: () => void;
}

export const ChartListItemContent: React.FC<ChartListItemContentProps> = ({
  isActive,
  chart,
  listMode,
  onClickDeleteChart,
}) => (
  <div
    className={`
      mb-2 flex
      cursor-pointer
      justify-between
      rounded-md
      p-1
      hover:bg-neutral-300 active:bg-neutral-400
      dark:hover:bg-neutral-800 dark:active:bg-neutral-700
      ${isActive ? 'bg-neutral-200 dark:bg-neutral-700' : {}}
    `}
  >
    <div className="basis-5/6 overflow-x-hidden">
      <p
        className="
            truncate text-2xl
            font-semibold
          "
      >
        {chart.name}
      </p>

      <p className="text-xs font-light dark:text-neutral-400">
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
);

export const ChartListItemLoader: React.FC = () => (
  <div
    className="
      mb-2 flex h-16
      cursor-pointer
      justify-between rounded-md
      p-1
      hover:bg-neutral-300 active:bg-neutral-400
      dark:hover:bg-neutral-800 dark:active:bg-neutral-700
    "
  >
    <div className="basis-full">
      <p
        className="
          h-[36px] w-full animate-pulse bg-neutral-200 text-2xl
          dark:bg-neutral-700
        "
      />
      <p
        className="
          mt-1 h-[16px] w-36 animate-pulse bg-neutral-200 text-xs dark:bg-neutral-700
        "
      />
    </div>
  </div>
);
