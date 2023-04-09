import { ListRowMode } from '../Mobile/ListRow/ListRow';
import {
  ChartListItem,
} from './ChartListItem/ChartListItem';
import { trpc } from '../../../utils/trpc';
import { useEffect, useState } from 'react';
import { IChartListItem } from '../../../server/trpc/router/charts/getChartsForUser';
import { colorMap } from '../../../constants/colors';
import { Color } from '../../global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import { ListOfChartsLoader } from './Loader';

export interface Props {
  activeChartUuid?: string;
  isMobile: boolean;
  setChartBeingViewed?: (chartUuid: string) => void;
  titleText?: string;
}

export const ListOfCharts: React.FC<Props> = ({
  activeChartUuid,
  isMobile,
  setChartBeingViewed = () => undefined,
  titleText = 'your charts',
}) => {
  const { data } = trpc.charts.getUserCharts.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const [visibilityMap, setVisibilityMap] = useState(
    new Array(1000).map(() => true)
  );
  useEffect(() => {
    setVisibilityMap(new Array(1000).map(() => true));
  }, [data]);

  const deleteChartMutation = trpc.charts.delete.useMutation();
  const onClickDeleteChart = (chart: IChartListItem, index: number) => {
    setVisibilityMap((visibilityMap) => {
      const newVizMap = [...visibilityMap];
      newVizMap[index] = !false;
      return newVizMap;
    });
    deleteChartMutation.mutateAsync({ uuid: chart.uuid ? chart.uuid : '' });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [listMode, setListMode] = useState(ListRowMode.NORMAL);
  return (
    <>
      <h1 className="text-4xl font-bold">{titleText}</h1>
      <div
        className={`
          ${colorMap[Color.fuchsia]}
          my-4
          h-1 w-full rounded-full shadow-md
        `}
      />
      {data ? (
        <>
          {data.map((chart, index) => (
            <div key={`${index}-chart-list-item`}>
              {visibilityMap[index] ? (
                <div></div>
              ) : (
                <ChartListItem
                  isActive={activeChartUuid && activeChartUuid === chart.uuid}
                  chart={chart}
                  isMobile={isMobile}
                  listMode={listMode}
                  onClick={() => {
                    setChartBeingViewed(chart.uuid ?? '');
                  }}
                  onClickDeleteChart={() => onClickDeleteChart(chart, index)}
                />
              )}
            </div>
          ))}
        </>
      ) : (
        <ListOfChartsLoader/>
      )}
    </>
  );
};

