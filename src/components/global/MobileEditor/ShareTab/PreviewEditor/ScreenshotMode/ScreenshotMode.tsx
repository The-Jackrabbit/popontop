import { EMPTY_ALBUM } from '../../../../../../constants/empty-album';
import { ChartHookNode } from '../../../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../../../types/Albums';
import Grid from '../../../../../lib/Grid/Grid';
import Title from '../../../../../lib/Title/Title';
import ChartItem from '../../../../DesktopEditor/DesktopChart/ChartItem/ChartItem';
import { getBorderSizes } from '../../../../DesktopEditor/DesktopChart/DesktopChart';
import { TextList } from './TextList/TextList';

export interface Props {
  borderColor: string;
  borderSize: number;
  chart: ChartHookNode;
  columns: number;
  list: Album[];
  onExit: () => void;
  rows: number;
}

export const ScreenshotMode: React.FC<Props> = ({
  borderColor,
  borderSize,
  chart,
  columns,
  list,
  onExit,
  rows,
}) => (
  <div className="fixed top-0 left-0 z-50">
    <div className="fixed right-0">
      <div
        className="
          z-50 h-[calc(100vh_-_30px)]
            w-screen bg-[rgba(255,255,255,0.98)]
            p-1 dark:bg-[rgba(0,0,0,0.98)]
          "
        onClick={() => onExit()}
      >
        <div className="flex h-full w-full flex-col items-stretch">
          {chart.childrenNodes.settings.state.showTitle ? (
            <Title
              backgroundColor={
                chart.childrenNodes.settings.state.backgroundColor
              }
              chartTitle={chart.state.chartTitle}
              isReadOnly={true}
              setValue={() => undefined}
              showIntroduction={false}
              textColor={chart.childrenNodes.settings.state.textColor}
            />
          ) : null}
          <Grid
            borderColor={borderColor}
            borderSize={borderSize}
            items={list}
            itemComponent={({ index, x, y }) => (
              <ChartItem
                album={
                  list[index] !== undefined
                    ? (list[index] as Album)
                    : EMPTY_ALBUM
                }
                borderColor={borderColor}
                borderSizes={getBorderSizes(index, list.length)}
                index={index}
                isReadOnly={true}
                rowIndex={x}
                columnIndex={y}
              />
            )}
          />
          <div className="flex shrink basis-[50%] flex-row justify-center">
            <TextList list={list.filter((_, i) => i < columns * rows)} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
