import { ChartSettings } from '@prisma/client';
import clamp from 'lodash.clamp';
import { useState } from 'react';
import {
  JUMP_VALUES,
  RowMovementType,
} from '../../../components/lib/Mobile/ListRow/RearrangeView/RearrangeView';
import { Album } from '../../../types/Albums';
import { ChartHookNode, useChart } from '../use-chart/use-chart';
import useMobileEditor from '../editor/use-mobile-editor';
import { ParentHookNode } from '../../../types/singletons';

export enum UseChartListContext {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export type DesktopChartEditorHookNode = ParentHookNode<
  State,
  Actions,
  {
    chart: ChartHookNode;
  }
>;
export type Actions = {
  onRearrangeClick: () => void;
  onClickSheetDeadArea: () => void;
  toggleTitle: () => void;
};

export type State = void;

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
  if (defaultSettings) {
    debugger;
  }
  const [isFirstCloseDone, setIsFirstCloseDone] = useState(
    initialList.length > 0 || context === UseChartListContext.EDIT
  );
  const chart = useChart({
    initialChartSettings: defaultSettings ?? undefined,
    chartUuid,
    initialChartTitle: chartName,
    initialList,
  });
  const editor = useMobileEditor(() => {
    if (!isFirstCloseDone && chart.childrenNodes.list.state.length > 0) {
      toggleTitle();
    }
  });
  const toggleTitle = () => setIsFirstCloseDone(true);

  const onClickSheetDeadArea = () =>
    editor.state.isSheetOpen ? close() : undefined;

  const onRearrangeClick = (
    rowMovementType: RowMovementType,
    index: number
  ) => {
    const unboundIndex = index - JUMP_VALUES[rowMovementType];
    const length = chart.childrenNodes.list.state.length;
    const min = 0;
    const max = length;

    const indexToMoveTo = clamp(unboundIndex, min, max);

    chart.childrenNodes.list.actions.insertAlbumAtIndex(
      chart.childrenNodes.list.state[index] as Album,
      index,
      indexToMoveTo
    );
  };

  const showIntroduction =
    context === UseChartListContext.EDIT
      ? false
      : chart.childrenNodes.list.state.length === 0;

  return {
    actions: {
      onRearrangeClick,
      onClickSheetDeadArea,
      toggleTitle,
    },
    childrenNodes: {
      chart,
      editor,
    },
    state: {
      showIntroduction,
    },
  };
};

export default useMobileChartEditor;
