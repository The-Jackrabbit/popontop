import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ChartSettings } from '@prisma/client';
import { SpringValue } from 'react-spring';
import { Album } from '../../../types/Albums';
import { HookNode } from '../../../types/singletons';
import useDesktopTitle from '../springs/use-desktop-title';
import useChart, { ChartHookNode } from '../use-chart/use-chart';
import { setThemeColorMetaTag } from '../../../server/utils/mobile-theme';
import { useDesktopEntriesTextList } from '../springs/use-desktop-entries-text-list';

export interface DesktopChartEditorHookNode extends HookNode<State, Actions> {
  chart: ChartHookNode;
}

export interface Actions {
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setIsPreviewVisible: Dispatch<SetStateAction<boolean>>;
  setPreviewIndex: Dispatch<SetStateAction<number>>;
  toggleAlbums: (value: boolean) => void;
  toggleTitle: (value: boolean) => void;
}

export interface State {
  isPreviewVisible: boolean;
  isDragging: boolean;
  previewIndex: number;
  listStyle: { width: SpringValue<string> };
  titleStyle: { height: SpringValue<string> };
  showOnboardingFlow: boolean;
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
  const { listStyle, toggleAlbums } = useDesktopEntriesTextList({
    setShowEntries: chart.settings.actions.setShowEntries,
    showEntries: chart.settings.state.showEntries,
  });

  const [showOnboardingFlow] = useState(!true);

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  useEffect(() => {
    setThemeColorMetaTag(chart.settings.state.backgroundColor);
  }, [chart.settings.state.backgroundColor]);

  return {
    actions: {
      setIsDragging,
      setIsPreviewVisible,
      setPreviewIndex,
      toggleAlbums,
      toggleTitle,
    },
    chart,
    state: {
      isDragging,
      isPreviewVisible,
      listStyle,
      previewIndex,
      showOnboardingFlow,
      titleStyle,
    },
  };
};

export default useDesktopChartEditor;
