import { ChartSettings } from "@prisma/client";
import clamp from "lodash.clamp";
import { useState } from "react";
import { useSpring } from "react-spring";
import { ListRowMode } from "../../components/lib/Mobile/ListRow/ListRow";
import { JUMP_VALUES, RowMovementType } from "../../components/lib/Mobile/ListRow/RearrangeView/RearrangeView";
import { Album } from "../../styles/types/Albums";
import { trpc } from '../../utils/trpc';
import useChartSettings from "./use-chart/use-chart-settings";
import { useDragSheetDown } from "./use-drag-sheet-down";
import useList from "./use-list";

const height = 667;

export enum UseChartListContext {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

const useChartList = ({
  chartName = 'My sick ass chart',
  chartUuid,
  defaultSettings,
  initialList,
}: {
  chartName?: string;
  chartUuid: string;
  context?: UseChartListContext;
  defaultSettings: ChartSettings | null;
  initialList?: Album[];
}) => {
  const mutation = trpc.charts.create.useMutation();
  const editMutation = trpc.charts.edit.useMutation();
  const settings = useChartSettings(defaultSettings);
  const { list, mutations: listMutations } = useList(initialList);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFirstCloseDone, setIsFirstCloseDone] = useState(false);
  const [isActive, setIsActive] = useState(true); 
  const [listMode, setListMode] = useState<ListRowMode>(ListRowMode.NORMAL);
  const [chartTitle, setChartTitle] = useState(chartName);
  const [titleHeightStyle, titleHeightAnimation] = useSpring(() => ({
    height: list.length === 0 ? '250px' : '60px',
    config: {
      bounce: 2,
      friction: 20,
      mass: 1,
      tension: 200,
    },
  }));
  
  const toggleTitle = () => {
    setIsFirstCloseDone(true);
    const cHeight =  titleHeightStyle.height.get();
    const height = cHeight === '60px' ? '0px' : '60px';
    titleHeightAnimation.start({ height });
  };

  const saveChart = async (): Promise<string> => {
    const result = await mutation.mutateAsync({
      albums: list,
      name: chartTitle,
      settings: {
        backgroundColor: settings.backgroundColor,
        borderColor: settings.borderColor,
        borderSize: settings.borderSize,
        showAlbums: settings.showAlbums,
        showTitle: settings.showTitle,
        textColor: settings.textColor,
      },
    });

    return result.chart.uuid ?? '';
  };

  const editChart = async (): Promise<string> => {
    const result = await editMutation.mutateAsync({
      uuid: chartUuid,
      albums: list,
      name: chartTitle,
      settings: {
        backgroundColor: settings.backgroundColor,
        borderColor: settings.borderColor,
        borderSize: settings.borderSize,
        showAlbums: settings.showAlbums,
        showTitle: settings.showTitle,
        textColor: settings.textColor,
      },
    });

    return result?.chart?.uuid ?? '';
  };
  
  const isSheetOpen = isSettingsOpen || isSearchOpen;
  const {
    bgStyle,
    bind,
    close,
    display,
    open,
    windowHeight,
    y,
  } = useDragSheetDown(height, () => {
    setIsSettingsOpen(false);
    setIsSearchOpen(false);
    if (!isFirstCloseDone && list.length > 0) {
      toggleTitle();
    }
  });

  const onClickSheetDeadArea = () => {
    if (isSheetOpen) {
      close();
    }
  };

  const onRearrangeClick = (rowMovementType: RowMovementType, index: number) => {
    const unboundIndex = index - JUMP_VALUES[rowMovementType];
    const length = list.length;
    const min = 0;
    const max = length - 1;

    const indexToMoveTo = clamp(
      unboundIndex,
      min,
      max,
    );

    listMutations.insertAlbumAtIndex(list[index] as Album, index, indexToMoveTo);
  };

  const onClickSettings = () => {
    setIsSettingsOpen(true);
    open({ canceled: false });
  };

  const onClickSearch = () => {
    setIsSearchOpen(true);
    open({ canceled: false });
  };

  return {
    actions: {
      editChart,
      listMutations,
      onClickRearrangeMode: () => setListMode(
        (listMode) => listMode !== ListRowMode.REARRANGE
          ? ListRowMode.REARRANGE
          : ListRowMode.NORMAL
      ),
      onClickDeleteMode: () => setListMode(
        (listMode) => listMode !== ListRowMode.DELETE
          ? ListRowMode.DELETE
          : ListRowMode.NORMAL
      ),
      onClickSheetDeadArea,
      onClickSearch,
      onClickSettings,
      onRearrangeClick,
      openSearchView: () => {
        setIsSearchOpen(true);
        open({ canceled: false });
      },
      saveChart,
      setIsActive,
      // not in love with chart title being in editor state vs actual state that also is in the db but eh maybe move later
      setChartTitle,
    },
    sheet: {
      bgStyle,
      bind,
      display,
      windowHeight,
      y,
    },
    state: {
      chartTitle,
      isSettingsOpen,
      isSearchOpen,
      isFirstCloseDone,
      isActive,
      isLoading: mutation.isLoading,
      list,
      listMode,
      settings: {
        ...settings,
        setShowTitle: (value: boolean) => {
          settings.setShowTitle(value);
          toggleTitle();
        },
      },
      showIntroduction: !isFirstCloseDone && list.length === 0,
      titleHeightStyle,
    },
  };
};

export default useChartList;
