import { useState } from 'react';
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
  showOnboardingFlow: boolean;
}

export interface ChildrenNodes {
  chart: ChartHookNode;
}

export interface Props {
  chartName?: string;
  chartUuid?: string;
  initialSettings?: ChartSettings;
  initialList?: Album[];
}

export const useDesktopChartEditor = ({
  chartName = 'My sick ass chart',
  chartUuid = '',
  initialSettings,
  initialList,
}: Props): DesktopChartEditorHookNode => {
  const chart = useChart({
    initialSettings,
    chartUuid,
    initialChartTitle: chartName,
    initialList,
  });
  const { titleStyle, toggleTitle } = useDesktopTitle({
    setShowTitle: chart.settings.actions.setShowTitle,
    showTitle: chart.settings.state.showTitle,
  });
  const { listStyle, toggleAlbums } = useDesktopAlbumsTextList({
    setShowAlbums: chart.settings.actions.setShowAlbums,
    showAlbums: chart.settings.state.showAlbums,
  });

  const [showOnboardingFlow, setShowOnboardingFlow] = useState(!true);

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
      showOnboardingFlow,
      titleStyle,
    },
  };
};

export default useDesktopChartEditor;
