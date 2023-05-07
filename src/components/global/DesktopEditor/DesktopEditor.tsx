import React from 'react';
import { ChartHookNode } from '../../../frontend/hooks/use-chart/use-chart';
import Title from '../../lib/Title/Title';
import ChartListV2 from './ChartListV2/ChartListV2';
import DesktopChart from './DesktopChart/DesktopChart';
import Layout from './Layout';

export interface Props {
  chart: ChartHookNode;
  readonly?: boolean;
  showOnboardingFlow: boolean;
}

const DesktopEditor: React.FC<Props> = ({
  chart,
  readonly = false,
  showOnboardingFlow,
}) => (
  <>
    {showOnboardingFlow ? (
      <div>
        <p className="text-2xl">
          to get quickly started,
          <kbd className="mx-4">click</kbd>
          anywhere on the sidebar
        </p>
      </div>
    ) : (
      <Layout
        uuid={chart.state.savedChartId}
        title={
          chart.childrenNodes.settings.state.showTitle ? (
            <Title
              backgroundColor={
                chart.childrenNodes.settings.state.titleBackgroundColor
              }
              chartTitle={chart.state.chartTitle}
              isReadOnly={false}
              setValue={chart.actions.setChartTitle}
              showIntroduction={!true}
              textColor={chart.childrenNodes.settings.state.textColor}
            />
          ) : null
        }
        list={
          chart.childrenNodes.settings.state.showAlbums ? (
            <ChartListV2
              textColor={chart.childrenNodes.settings.state.textColor}
              columnCount={1}
              list={chart.state.numberedList}
            />
          ) : null
        }
        chart={
          <DesktopChart
            borderColor={chart.childrenNodes.settings.state.borderColor}
            borderSize={chart.childrenNodes.settings.state.borderSize}
            isReadOnly={readonly}
            items={chart.state.numberedList}
          />
        }
      />
    )}
  </>
);

export default DesktopEditor;
