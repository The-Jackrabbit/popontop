import { ListRowMode } from '../Mobile/ListRow/ListRow';
import {
  ChartListItem,
  ChartListItemLoader,
} from './ChartListItem/ChartListItem';
import { trpc } from '../../../utils/trpc';
import { useEffect, useState } from 'react';
import { IChartListItem } from '../../../server/trpc/router/charts/getChartsForUser';
import { colorMap } from '../../../constants/colors';
import { Color } from '../../global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';

export interface Props {
  isMobile: boolean;
  setChartBeingViewed?: (chartUuid: string) => void;
  titleText?: string;
}

export const ListOfCharts: React.FC<Props> = ({
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
  const deleteChartMutation = trpc.charts.delete.useMutation();
  useEffect(() => {
    setVisibilityMap(new Array(1000).map(() => true));
  }, [data]);
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
        <ListOfChartsLoader />
      )}
    </>
  );
};

export const ListOfChartsLoader: React.FC = ({}) => (
  <div className="max-h-[80vh] overflow-y-scroll">
    {[...new Array(100)].map((_, index) => (
      <ChartListItemLoader key={`${index}-chart-list-loader`} />
    ))}
  </div>
);
