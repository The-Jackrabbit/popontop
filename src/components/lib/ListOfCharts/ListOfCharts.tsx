import { ListRowMode } from '../Mobile/ListRow/ListRow';
import { ChartListItem } from './ChartListItem/ChartListItem';
import { IChartListItem } from '../../../server/trpc/router/charts/getChartsForUser';
import { colorMap } from '../../../constants/colors';
import { Color } from '../../global/Desktop/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import { ListOfChartsLoader } from './Loader';

export interface Props {
  activeChartUuid?: string;
  isLoading?: boolean;
  listOfCharts: IChartListItem[] | undefined;
  setChartBeingViewed?: (chartUuid: string) => void;
  showTitle?: boolean;
  titleText?: string;
}

export const ListOfCharts: React.FC<Props> = ({
  activeChartUuid,
  isLoading,
  listOfCharts,
  setChartBeingViewed = () => undefined,
  showTitle = true,
  titleText,
}) => (
  <>
    {showTitle ? (
      <>
        <h1 className="text-4xl font-bold">{titleText}</h1>
        <div
          className={`${
            colorMap[Color.amber]
          } my-4 h-1 w-full rounded-full shadow-md`}
        />
      </>
    ) : null}
    {!isLoading ? (
      <>
        {listOfCharts
          ? listOfCharts.map((chart: IChartListItem, index: number) => (
              <ChartListItem
                chart={chart}
                isActive={
                  activeChartUuid !== '' && activeChartUuid === chart.uuid
                }
                isMobile={false}
                key={`${index}-chart-list-item`}
                listMode={ListRowMode.NORMAL}
                onClick={() => {
                  setChartBeingViewed(chart.uuid ?? '');
                }}
                onClickDeleteChart={() => undefined}
              />
            ))
          : null}
      </>
    ) : (
      <ListOfChartsLoader />
    )}
  </>
);
