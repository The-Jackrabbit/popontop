import React, { useEffect } from 'react';
import { a } from "react-spring";
import Title from '../MobileEditor/Title/Title';
import DesktopActions from './Actions/DesktopActions';
import ChartList from './ChartList/ChartList';
import DesktopChart from './DesktopChart/DesktopChart';
import Layout from './Layout';
import { Chart, Settings } from '../../../frontend/hooks/use-chart';

export interface Props {
  chart: Chart;
  mutation: any;
  listStyles: any;
  readonly?: boolean;
  titleStyle: any;
}

const DesktopEditor: React.FC<Props> = ({
  chart,
  mutation,
  listStyles,
  titleStyle,
  readonly = false,
}) => {
  // useEffect(() => {
  //   console.log({ chart });
  // }, [chart]);
  return (
    <Layout
      isReadonly={readonly}
      title={
        <a.div style={titleStyle} className="overflow-y-hidden w-full">
          <Title
            chartTitle={chart.data.chartTitle}
            setValue={(val: string) => chart.actions.setChartTitle(val)}
            showIntroduction={true}
            isReadOnly={readonly}
          />
        </a.div>
      }
      chart={
        <DesktopChart
          isReadOnly={readonly}
          numberOfColumns={chart.settings.data.numberOfColumns}
          numberOfRows={chart.settings.data.numberOfRows}
          containers={chart.data.entries ?? []}
          backgroundColor={chart.settings.data.backgroundColor}
          borderColor={chart.settings.data.borderColor}
          borderSize={chart.settings.data.borderSize}
        />
      }
      list={
        <ChartList
          listStyles={listStyles}
          containers={chart.data.entries ?? []}
          textColor={chart.settings.data.textColor}
        />
      }
      actions={
        <DesktopActions
          isLoading={mutation.isLoading}
          save={chart.actions.save}
          savedChartId={chart.data.savedChartId}
        />
      }
    />
  );
};

export default DesktopEditor;
