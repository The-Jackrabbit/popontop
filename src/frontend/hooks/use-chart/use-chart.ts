import { ChartSettings } from '@prisma/client';
import { useMemo, useState } from 'react';
import { Album } from '../../../types/Albums';
import { trpc } from '../../../utils/trpc';
import { ParentHookNode } from '../../../types/singletons';
import useList, { ListHookNode } from '../lists/use-list';
import useChartSettings, { SettingsHookNode } from './use-chart-settings';
import { EMPTY_ALBUM } from '../../../constants/empty-album';
import { useRouter } from 'next/router';

const getNumberedList = (numberOfAlbums: number, listState: Album[]) => {
  const emptyTextList = [...new Array(numberOfAlbums)];

  return emptyTextList.map((_, index) =>
    index < numberOfAlbums && index < listState.length
      ? (listState[index] as Album)
      : EMPTY_ALBUM
  );
};

export type ChartHookNode = ParentHookNode<State, Actions, ChildrenNodes>;

export interface Actions {
  deleteChart: () => Promise<void>;
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
  isDeleteLoading: boolean;
  isEditLoading: boolean;
  numberedList: Album[];
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
  const router = useRouter();
  const [chartTitle, setChartTitle] = useState(initialChartTitle);
  const settings = useChartSettings(initialChartSettings);
  const list = useList(initialList);
  const [savedChartId, setSavedChartId] = useState(chartUuid);
  const createMutation = trpc.charts.create.useMutation();
  const editMutation = trpc.charts.edit.useMutation();
  const deleteMutation = trpc.charts.delete.useMutation();

  const saveChart = async (): Promise<string> => {
    const result = await createMutation.mutateAsync({
      albums: list.state,
      name: chartTitle,
      settings: {
        background_color: settings.state.backgroundColor,
        border_color: settings.state.borderColor,
        border_size: settings.state.borderSize,
        number_of_albums: settings.state.numberOfAlbums,
        show_albums: settings.state.showAlbums,
        show_title: settings.state.showTitle,
        text_color: settings.state.textColor,
        title_background_color: settings.state.titleBackgroundColor,
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
        background_color: settings.state.backgroundColor,
        border_color: settings.state.borderColor,
        border_size: settings.state.borderSize,
        number_of_albums: settings.state.numberOfAlbums,
        show_albums: settings.state.showAlbums,
        show_title: settings.state.showTitle,
        text_color: settings.state.textColor,
        title_background_color: settings.state.titleBackgroundColor,
      },
    });

    const savedChartId = result?.chart?.uuid ?? '';
    setSavedChartId(savedChartId);
    return savedChartId;
  };

  const deleteChart = async (): Promise<void> => {
    await deleteMutation.mutateAsync({
      uuid: chartUuid,
    });

    router.push(`/your-charts`);
  };

  const state = useMemo<State>(
    () => ({
      chartTitle,
      isCreateLoading: createMutation.isLoading,
      isDeleteLoading: deleteMutation.isLoading,
      isEditLoading: editMutation.isLoading,
      numberedList: getNumberedList(settings.state.numberOfAlbums, list.state),
      savedChartId,
    }),
    [
      chartTitle,
      createMutation.isLoading,
      deleteMutation.isLoading,
      editMutation.isLoading,
      savedChartId,
      settings.state.numberOfAlbums,
      list.state,
    ]
  );

  return {
    actions: {
      deleteChart,
      editChart,
      saveChart,
      setChartTitle,
    },
    childrenNodes: {
      list: {
        ...list,
        state: list.state.filter(
          (_, index) => index < settings.state.numberOfAlbums
        ),
      },
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
