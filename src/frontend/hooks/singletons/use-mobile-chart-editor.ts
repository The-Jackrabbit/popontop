import { ChartSettings } from '@prisma/client';
import clamp from 'lodash.clamp';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  JUMP_VALUES,
  RowMovementType,
} from '../../../components/lib/Mobile/ListRow/RearrangeView/RearrangeView';
import { Album } from '../../../types/Albums';
import { ChartHookNode, useChart } from '../use-chart/use-chart';
import useMobileEditor, {
  MobileEditorHookNode,
} from '../editor/use-mobile-editor';
import { HookNode } from '../../../types/singletons';
import { setThemeColorMetaTag } from '../../../server/utils/mobile-theme';

export enum UseChartListContext {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export interface MobileChartEditorHookNode extends HookNode<State, Actions> {
  chart: ChartHookNode;
  editor: MobileEditorHookNode;
}

export type Actions = {
  onRearrangeClick: (rowMovementType: RowMovementType, index: number) => void;
  onClickSheetDeadArea: () => void;
  setPreviewIndex: Dispatch<SetStateAction<number>>;
  toggleTitle: () => void;
};

export interface State {
  previewIndex: number;
  showIntroduction: boolean;
}

export interface Props {
  chartName?: string;
  chartUuid: string;
  context?: UseChartListContext;
  initialSettings?: ChartSettings;
  initialList?: Album[];
}

const useMobileChartEditor = ({
  chartName = 'My sick ass chart',
  chartUuid,
  context,
  initialList,
  initialSettings,
}: Props): MobileChartEditorHookNode => {
  const [isFirstCloseDone, setIsFirstCloseDone] = useState(
    (initialList && initialList.length > 0) ||
      context === UseChartListContext.EDIT
  );
  const [previewIndex, setPreviewIndex] = useState(0);
  const chart = useChart({
    initialSettings,
    chartUuid,
    initialChartTitle: chartName,
    initialList,
  });
  const editor = useMobileEditor(() => {
    if (!isFirstCloseDone && chart.list.state.list.length > 0) {
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
    const length = chart.list.state.list.length;
    const min = 0;
    const max = length;

    const indexToMoveTo = clamp(unboundIndex, min, max);

    chart.list.actions.insertAlbumAtIndex(
      chart.list.state.list[index] as Album,
      index,
      indexToMoveTo
    );
  };

  const showIntroduction =
    context === UseChartListContext.EDIT
      ? false
      : chart.list.state.list.length === 0;

  useEffect(() => {
    if (chart.settings.state.backgroundColor) {
      setThemeColorMetaTag(chart.settings.state.backgroundColor);
    }
  }, [chart.settings.state.backgroundColor]);
  return {
    actions: {
      onRearrangeClick,
      onClickSheetDeadArea,
      setPreviewIndex,
      toggleTitle,
    },
    chart,
    editor,
    state: {
      previewIndex,
      showIntroduction,
    },
  };
};

export default useMobileChartEditor;
