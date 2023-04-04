import { ChartSettings } from '@prisma/client';
import { useMemo, useState } from 'react';
import { Album } from '../../../types/Albums';
import { trpc } from '../../../utils/trpc';
import { ParentHookNode } from '../../../types/singletons';
import useList, { ListHookNode } from '../lists/use-list';
import useChartSettings, { SettingsHookNode } from './use-chart-settings';

export type ChartHookNode = ParentHookNode<State, Actions, ChildrenNodes>;

export interface Actions {
  editChart: () => Promise<string>;
  saveChart: () => Promise<string>;
  setChartTitle: (value: string) => void;
}

export interface ChildrenNodes {
  list: ListHookNode;
  settings: SettingsHookNode;
}

export interface State {
  chartTitle: string;
  isCreateLoading: boolean;
  isEditLoading: boolean;
  savedChartId: string;
}

export interface Props {
  chartUuid?: string;
  initialChartSettings?: ChartSettings;
  initialChartTitle?: string;
  initialList?: Album[];
}

export const useChart = ({
  chartUuid = '',
  initialChartSettings = {} as ChartSettings,
  initialChartTitle = '',
  initialList,
}: Props): ChartHookNode => {
  const [chartTitle, setChartTitle] = useState(initialChartTitle);
  const settings = useChartSettings(initialChartSettings);
  const list = useList(initialList);
  const [savedChartId, setSavedChartId] = useState(chartUuid);
  const createMutation = trpc.charts.create.useMutation();
  const editMutation = trpc.charts.edit.useMutation();

  const saveChart = async (): Promise<string> => {
    const result = await createMutation.mutateAsync({
      albums: list.state,
      name: chartTitle,
      settings: {
        backgroundColor: settings.state.backgroundColor,
        borderColor: settings.state.borderColor,
        borderSize: settings.state.borderSize,
        showAlbums: settings.state.showAlbums,
        showTitle: settings.state.showTitle,
        textColor: settings.state.textColor,
      },
    });

    const savedChartId = result.chart.uuid ?? '';
    setSavedChartId(savedChartId);
    return savedChartId;
  };

  const editChart = async (): Promise<string> => {
    const result = await editMutation.mutateAsync({
      uuid: chartUuid,
      albums: list.state,
      name: chartTitle,
      settings: {
        backgroundColor: settings.state.backgroundColor,
        borderColor: settings.state.borderColor,
        borderSize: settings.state.borderSize,
        showAlbums: settings.state.showAlbums,
        showTitle: settings.state.showTitle,
        textColor: settings.state.textColor,
      },
    });

    const savedChartId = result?.chart?.uuid ?? '';
    setSavedChartId(savedChartId);
    return savedChartId;
  };
  const state = useMemo(
    () => ({
      chartTitle,
      isCreateLoading: createMutation.isLoading,
      isEditLoading: editMutation.isLoading,
      savedChartId,
    }),
    [chartTitle, createMutation.isLoading, editMutation.isLoading, savedChartId]
  );
  return {
    actions: {
      editChart,
      saveChart,
      setChartTitle,
    },
    childrenNodes: {
      list,
      settings,
    },
    state,
  };
};

export default useChart;

export interface DraggedAlbum {
  index: number;
  data: Album;
  origin: string;
}
