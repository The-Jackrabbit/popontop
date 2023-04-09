import { ChartSettings } from '@prisma/client';
import { SpringValue } from 'react-spring';
import { Album } from '../../../types/Albums';
import { ParentHookNode } from '../../../types/singletons';
import { useDesktopAlbumsTextList } from '../springs/use-desktop-albums-text-list';
import useDesktopTitle from '../springs/use-desktop-title';
import useChart, { ChartHookNode } from '../use-chart/use-chart';

export type DesktopChartEditorHookNode = ParentHookNode<
  State,
  Actions,
  ChildrenNodes
>;

export interface Actions {
  toggleAlbums: (value: boolean) => void;
  toggleTitle: (value: boolean) => void;
}

export interface State {
  listStyle: { width: SpringValue<string> };
  titleStyle: { height: SpringValue<string> };
}

export interface ChildrenNodes {
  chart: ChartHookNode;
}

export interface Props {
  chartName?: string;
  chartUuid?: string;
  defaultSettings?: ChartSettings | null;
  initialList?: Album[];
}

export const useDesktopChartEditor = ({
  chartName = 'My sick ass chart',
  chartUuid = '',
  defaultSettings = null,
  initialList,
}: Props): DesktopChartEditorHookNode => {
  const chart = useChart({
    initialChartSettings: defaultSettings ?? undefined,
    chartUuid,
    initialChartTitle: chartName,
    initialList,
  });
  const { titleStyle, toggleTitle } = useDesktopTitle({
    setShowTitle: chart.childrenNodes.settings.actions.setShowTitle,
    showTitle: chart.childrenNodes.settings.state.showTitle,
  });
  const { listStyle, toggleAlbums } = useDesktopAlbumsTextList({
    setShowAlbums: chart.childrenNodes.settings.actions.setShowAlbums,
    showAlbums: chart.childrenNodes.settings.state.showAlbums,
  });

  return {
    actions: {
      toggleAlbums,
      toggleTitle,
    },
    childrenNodes: {
      chart,
    },
    state: {
      listStyle,
      titleStyle,
    },
  };
};

export default useDesktopChartEditor;
