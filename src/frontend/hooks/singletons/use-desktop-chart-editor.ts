import { DragEndEvent } from "@dnd-kit/core";
import { ChartSettings } from "@prisma/client";
import { SpringValue } from "react-spring";
import { Album } from "../../../styles/types/Albums";
import { ParentHookNode } from "../hook-node";
import { useDesktopAlbumsTextList } from "../springs/use-desktop-albums-text-list";
import useDesktopTitle from "../springs/use-desktop-title";
import useChart, { ChartHookNode } from "../use-chart/use-chart";

export type DesktopChartEditorHookNode = ParentHookNode<State, Actions, {
  chart: ChartHookNode;
}
>
export type Actions = void;

export type State = void;

export const useDesktopChartEditor = ({
  chartName = 'My sick ass chart',
  chartUuid = '',
  defaultSettings = null,
  initialList = [],
}: {
  chartName?: string;
  chartUuid?: string;
  defaultSettings?: ChartSettings | null;
  initialList?: Album[];
}) => {
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
    } 
  }
};

export default useDesktopChartEditor;

export interface SettingsData {
  borderColor: string;
  textColor: string;
  backgroundColor: string;
  borderSize: number;
  numberOfRows: number;
  numberOfColumns: number;
  showAlbums: boolean;
  showTitle: boolean;
}

export interface SettingsActions {
  setShowAlbums: (value: boolean) => void;
  setShowTitle: (value: boolean) => void;
  setBorderColor: (value: string) => void;
  setTextColor: (value: string) => void;
  setBackgroundColor: (value: string) => void;
  setBorderSize: (value: number) => void;
  setNumberOfRows: (value: number) => void;
  toggleAlbums: (value: boolean) => void;
  toggleTitle: (value: boolean) => void;
  setNumberOfColumns: (value: number) => void;
}

export interface Settings {
  actions: SettingsActions;
  data: SettingsData;
}


export interface ChartActions {
  save: () => void;
  handleDragEnd: (event: DragEndEvent) => void;
  setDraggedAlbum: (draggedAlbum: DraggedAlbum) => void;
  setChartTitle: (title: string) => void;
}

export interface DraggedAlbum {
  data: Album;
  origin: string;
  index: number;
}

export interface ChartData {
  chartTitle: string;
  entries?: Album[],
  savedChartId: string | null;
}

export interface Chart {
  actions: ChartActions;
  data: ChartData;
  settings: Settings;
}

export interface ChartState {
  chart: Chart;
  listStyles: { width: SpringValue<string>; };
  isLoading: boolean;
  titleStyle: { height: SpringValue<string>; };
}