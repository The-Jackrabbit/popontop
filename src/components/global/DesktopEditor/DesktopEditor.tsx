import React from 'react';
import { SpringValue } from 'react-spring';
import { EMPTY_ALBUM } from '../../../constants/empty-album';
import { ChartHookNode } from '../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../types/Albums';
import Title from '../../lib/Title/Title';
import ChartListV2 from './ChartListV2/ChartListV2';
import DesktopChart from './DesktopChart/DesktopChart';
import Layout from './Layout';

export interface Props {
  chart: ChartHookNode;
  readonly?: boolean;
  titleStyle: { height: SpringValue<string> };
}

const DesktopEditor: React.FC<Props> = ({
  chart,
  readonly = false,
  // titleStyle,
}) => {
  const textList: Album[] = (() => {
    const lengthOfList =
      chart.childrenNodes.settings.state.rows *
      chart.childrenNodes.settings.state.columns;
    const emptyTextList = [...new Array(lengthOfList)];
    return emptyTextList.map((_, index) =>
      index < lengthOfList && chart.childrenNodes.list.state[index]
        ? (chart.childrenNodes.list.state[index] as Album)
        : EMPTY_ALBUM
    );
  })();
  return (
    <Layout
      backgroundColor={chart.childrenNodes.settings.state.backgroundColor}
      isReadonly={readonly}
      title={
        chart.childrenNodes.settings.state.showTitle ? (
          <Title
            chartTitle={chart.state.chartTitle}
            isReadOnly={false}
            setValue={chart.actions.setChartTitle}
            showIntroduction={!true}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
        ) : null
      }
      listTwo={
        chart.childrenNodes.settings.state.showAlbums ? (
          <ChartListV2
            textColor={chart.childrenNodes.settings.state.textColor}
            columnCount={3}
            list={textList}
          />
        ) : null
      }
      chart={() => (
        <DesktopChart
          borderColor={chart.childrenNodes.settings.state.borderColor}
          borderSize={chart.childrenNodes.settings.state.borderSize}
          isReadOnly={readonly}
          items={chart.childrenNodes.list.state}
        />
      )}
    />
  );
};

export default DesktopEditor;
