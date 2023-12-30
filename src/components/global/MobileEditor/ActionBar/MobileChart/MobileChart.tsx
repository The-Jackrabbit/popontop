import { a } from 'react-spring';
import { MobileEditorHookNode } from '../../../../../frontend/hooks/editor/use-mobile-editor';
import {
  Actions,
  State,
} from '../../../../../frontend/hooks/singletons/use-mobile-chart-editor';
import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';
import Title from '../../../../lib/Title/Title';
import List from '../../List/List';
import ActionBar from '../ActionBar';

export interface Props {
  actions: Actions;
  chart: ChartHookNode;
  editor: MobileEditorHookNode;
  state: State;
  isReadOnly?: boolean;
}

const MobileChart: React.FC<Props> = ({
  actions,
  chart,
  editor,
  state,
  isReadOnly = false,
}) => (
  <a.div
    id="editor"
    onClick={() => actions.onClickSheetDeadArea()}
    style={{
      ...editor.state.sheet.bgStyle,
      height: editor.state.sheet.windowHeight,
    }}
  >
    {chart.settings.state.showTitle ? (
      <Title
        backgroundColor={chart.settings.state.titleBackgroundColor}
        textColor={chart.settings.state.textColor}
        isReadOnly={isReadOnly}
        chartTitle={chart.state.chartTitle ?? ''}
        setValue={(value: string) => chart.actions.setChartTitle(value)}
        showIntroduction={state.showIntroduction}
      />
    ) : null}

    <List
      backgroundColor={chart.settings.state.backgroundColor}
      list={chart.list.state.list}
      listMode={editor.state.listMode}
      onRearrangeClick={actions.onRearrangeClick}
      removeAlbumAtIndex={chart.list.actions.removeAlbumAtIndex}
      showAlbums={chart.settings.state.showAlbums}
      textColor={chart.settings.state.textColor}
    />

    <ActionBar
      isEditLoading={chart.state.isEditLoading}
      className="-translate-x-4"
      editChart={chart.actions.editChart}
      isLoading={chart.state.isCreateLoading}
      listMode={editor.state.listMode}
      onClickSettings={editor.actions.onClickSettings}
      onClickSearch={editor.actions.onClickSearch}
      onClickDeleteMode={editor.actions.onClickDeleteMode}
      onClickRearrangeMode={editor.actions.onClickRearrangeMode}
      hasNonEmptyList={chart.list.state.list.length > 0}
      isActive={editor.state.isActive}
      isReadOnly={isReadOnly}
      setIsActive={editor.actions.setIsActive}
      createChart={chart.actions.createChart}
    />
  </a.div>
);

export default MobileChart;
