import { ChartHookNode } from '../../../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../../../types/Albums';
import ScreenShotApiCalls from '../../../../ScreenShot';

export interface Props {
  borderColor: string;
  borderSize: number;
  chart: ChartHookNode;
  columns: number;
  list: Album[];
  onExit: () => void;
  rows: number;
}

export const ScreenshotMode: React.FC<Props> = ({ chart, onExit }) => (
  <div className="fixed top-0 left-0 z-50">
    <div className="fixed right-0">
      <div
        className="
            z-50 flex
            h-screen w-screen
            justify-center
            bg-[rgba(255,255,255,0.98)] dark:bg-[rgba(0,0,0,0.98)]
          "
        onClick={() => onExit()}
      >
        <ScreenShotApiCalls uuid={chart.state.savedChartId} />
      </div>
    </div>
  </div>
);
