import React from 'react';
import { a, SpringValue } from 'react-spring';
import { addAbortSignal } from 'stream';
import { EMPTY_ALBUM } from '../../../constants/empty-album';
import { ChartHookNode } from '../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../styles/types/Albums';
import Title from '../../lib/Title/Title';
import DesktopActions from './Actions/DesktopActions';
import ChartListV2 from './ChartListV2/ChartListV2';
import DesktopChart from './DesktopChart/DesktopChart';
import Layout from './Layout';

export interface Props {
  chart: ChartHookNode;
  isLoading: boolean;
  readonly?: boolean;
  titleStyle: { height: SpringValue<string> };
}

const DesktopEditor: React.FC<Props> = ({
  chart,
  isLoading,
  readonly = false,
  // titleStyle,
}) => {
  const textList: Album[] = (() => {
    const lengthOfList = chart.childrenNodes.settings.state.rows *
    chart.childrenNodes.settings.state.columns;
    const emptyTextList = [...new Array(lengthOfList)];
    return emptyTextList.map(
      (_, index) =>
        index < lengthOfList && chart.childrenNodes.list.state[index]
          ? chart.childrenNodes.list.state[index] as Album
          : EMPTY_ALBUM 
    );
  })();
  return (
    <Layout
      backgroundColor={chart.childrenNodes.settings.state.backgroundColor}
      isReadonly={readonly}
      title={
        <Title
          chartTitle={chart.state.chartTitle}
          isReadOnly={false}
          setValue={chart.actions.setChartTitle}
          showIntroduction={!true}
          textColor="black"
        />
      }
      listTwo={
        <ChartListV2
          columnCount={3}
          list={textList}
        />
      }
      chart={(size: DOMRect) => (
        <DesktopChart
          backgroundColor={chart.childrenNodes.settings.state.backgroundColor}
          borderColor={chart.childrenNodes.settings.state.borderColor}
          borderSize={chart.childrenNodes.settings.state.borderSize}
          isReadOnly={readonly}
          items={chart.childrenNodes.list.state ?? []}
          numberOfColumns={chart.childrenNodes.settings.state.columns}
          numberOfRows={chart.childrenNodes.settings.state.rows}
          size={size}
        />
      )}
      actions={
        <DesktopActions
          isLoading={isLoading}
          save={chart.actions.saveChart}
          savedChartId={chart.state.savedChartId}
        />
      }
    />
  );
};

export default DesktopEditor;
