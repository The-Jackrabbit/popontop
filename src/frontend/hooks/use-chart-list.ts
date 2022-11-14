import { ChartSettings } from "@prisma/client";
import clamp from "lodash.clamp";
import { useState } from "react";
import { useSpring } from "react-spring";
import { ListRowMode } from "../../components/lib/Mobile/ListRow/ListRow";
import { JUMP_VALUES, RowMovementType } from "../../components/lib/Mobile/ListRow/RearrangeView/RearrangeView";
import { Album } from "../../types/Albums";
import { trpc } from '../../utils/trpc';
import useChartSettings from "./use-chart/use-chart-settings";
import { useDragSheetDown } from "./use-drag-sheet-down";
import useList from "./use-list";

const height = 667;
const useChartList = ({
  chartName = 'My sick ass chart',
  // readonly = false,
  defaultSettings,
}: {
  chartName: string;
  readonly?: boolean;
  defaultSettings: ChartSettings | null;
}) => {
  const mutation = trpc.charts.create.useMutation();
  const settings = useChartSettings(defaultSettings);
  const [isStarted, setIsStarted] = useState(false);
  const { list, mutations: listMutations } = useList(setIsStarted);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFirstCloseDone, setIsFirstCloseDone] = useState(false);
  const [isActive, setIsActive] = useState(true); 
  const [listMode, setListMode] = useState<ListRowMode>(ListRowMode.NORMAL);
  const [chartTitle, setChartTitle] = useState(chartName);
  const [titleHeightStyle, titleHeightAnimation] = useSpring(() => ({
    height: '250px',
    config: {
      bounce: 2,
      friction: 20,
      mass: 1,
      tension: 200,
    },
  }));
  
  const toggleTitle = () => {
    if (isStarted) {
      setIsFirstCloseDone(true);
      const cHeight =  titleHeightStyle.height.get();
      const height = cHeight === '60px' ? '0px' : '60px';
      titleHeightAnimation.start({ height });
    }
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
    toggleTitle();
  });

  const onClickSheetDeadArea = () => {
    if (!isSheetOpen) {
      return;
    }
    close();
  };

  const onRearrangeClick = (rowMovementType: RowMovementType, index: number) => {
    const indexToMoveTo = clamp(
      index - JUMP_VALUES[rowMovementType],
      0,
      list.length - 1,
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
      listMutations,
      onClickRearrangeMode: () => setListMode(
        (listMode) => listMode !== ListRowMode.REARRANGE
          ? ListRowMode.REARRANGE
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
      isStarted,
      list,
      listMode,
      settings: {
        ...settings,
        setShowTitle: (value: boolean) => {
          settings.setShowTitle(value);
          toggleTitle();
        },
      },
      showIntroduction: isStarted && list.length === 0,
      titleHeightStyle,
    },
  };
};

export default useChartList;
