import { ChartSettings } from "@prisma/client";
import clamp from "lodash.clamp";
import { useState } from "react";
import { JUMP_VALUES, RowMovementType } from "../../../components/lib/Mobile/ListRow/RearrangeView/RearrangeView";
import { Album } from "../../../styles/types/Albums";
import { useChart } from "../use-chart/use-chart";
import useMobileEditor from "../editor/use-mobile-editor";

export enum UseChartListContext {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

const useMobileChartEditor = ({
  chartName = 'My sick ass chart',
  chartUuid,
  context,
  defaultSettings,
  initialList = [],
}: {
  chartName?: string;
  chartUuid: string;
  context?: UseChartListContext;
  defaultSettings: ChartSettings | null;
  initialList?: Album[];
}) => {
  const [isFirstCloseDone, setIsFirstCloseDone] = useState(
    initialList.length > 0 || context === UseChartListContext.EDIT
  );
  const chart = useChart({
    initialChartSettings: defaultSettings ?? undefined,
    chartUuid,
    initialChartTitle: chartName,
  });
  const editor = useMobileEditor(() => {
    if (!isFirstCloseDone && chart.state.list.length > 0) {
      toggleTitle();
    }
  });
  const toggleTitle = () => setIsFirstCloseDone(true);

  const onClickSheetDeadArea = () =>
    editor.state.isSheetOpen
      ? close()
      : undefined;

  const onRearrangeClick = (rowMovementType: RowMovementType, index: number) => {
    const unboundIndex = index - JUMP_VALUES[rowMovementType];
    const length = chart.state.list.length;
    const min = 0;
    const max = length;

    const indexToMoveTo = clamp(
      unboundIndex,
      min,
      max,
    );

    chart.actions.list.insertAlbumAtIndex(
      chart.state.list[index] as Album,
      index,
      indexToMoveTo,
    );
  };
  
  const showIntroduction =
    context === UseChartListContext.EDIT
      ? false
      : chart.state.list.length === 0;
  
  return {
    actions: {
      chart: chart.actions,
      editor: editor.actions,
      onRearrangeClick,
      onClickSheetDeadArea,
      toggleTitle,
    },
    state: {
      chart: chart.state,
      editor: editor.state,
      showIntroduction,
    },
  };
};

export default useMobileChartEditor;