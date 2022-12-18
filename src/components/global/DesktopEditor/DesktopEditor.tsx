import React from 'react';
import { a, SpringValue } from 'react-spring';
import { ChartHookNode } from '../../../frontend/hooks/use-chart/use-chart';
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
  titleStyle,
}) => {
  return (
    <Layout
      backgroundColor={chart.childrenNodes.settings.state.backgroundColor}
      isReadonly={readonly}
      title={
        <a.div style={titleStyle} className="mb-2 w-full overflow-y-hidden">
          <Title
            chartTitle={chart.state.chartTitle}
            isReadOnly={false}
            setValue={chart.actions.setChartTitle}
            showIntroduction={!true}
            textColor="black"
          />
        </a.div>
      }
      listTwo={
        <ChartListV2 columnCount={3} list={chart.childrenNodes.list.state} />
      }
      chart={(size: DOMRect) =>
        // TODO : Implement beginning instructions for desktop
        true ? (
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
        ) : null
      }
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
