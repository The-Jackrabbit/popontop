import { ListRowMode } from '../Mobile/ListRow/ListRow';
import { ChartListItem } from './ChartListItem/ChartListItem';
import { IChartListItem } from '../../../server/trpc/router/charts/getChartsForUser';
import { colorMap } from '../../../constants/colors';
import { Color } from '../../global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';

export interface Props {
  activeChartUuid?: string;
  listOfCharts: IChartListItem[] | undefined;
  setChartBeingViewed?: (chartUuid: string) => void;
  titleText?: string;
}

export const ListOfCharts: React.FC<Props> = ({
  activeChartUuid,
  listOfCharts,
  setChartBeingViewed = () => undefined,
  titleText,
}) => (
  <>
    <h1 className="text-4xl font-bold">{titleText}</h1>
    <div
      className={`${
        colorMap[Color.amber]
      } my-4 h-1 w-full rounded-full shadow-md`}
    />
    {listOfCharts
      ? listOfCharts.map((chart: IChartListItem, index: number) => (
          <ChartListItem
            chart={chart}
            isActive={activeChartUuid !== '' && activeChartUuid === chart.uuid}
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
);
