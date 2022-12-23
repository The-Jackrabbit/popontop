import { Album } from '../../../../../../styles/types/Albums';
import Grid from '../../../../../lib/Grid/Grid';
import { useResizer } from '../../../../../lib/Grid/Grid.stories';
import Title from '../../../../../lib/Title/Title';
import { TextList } from './TextList/TextList';

export interface Props {
  borderColor: string;
  borderSize: number;
  chartTitle: string;
  columns: number;
  list: Album[];
  onExit: () => void;
  rows: number;
}

export const ScreenshotMode: React.FC<Props> = ({
  borderColor,
  borderSize,
  chartTitle,
  columns,
  list,
  onExit,
  rows,
}) => {
  const { containerRef, size } = useResizer();
  return (
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
          <div
            {...containerRef}
            className="flex h-full w-full flex-col items-stretch"
          >
            <Title
              chartTitle={chartTitle}
              isReadOnly={true}
              setValue={() => undefined}
              showIntroduction={false}
              textColor="white"
            />
            {size ? (
              <Grid
                borderColor={borderColor}
                borderSize={borderSize}
                columns={columns}
                rows={rows}
                size={size}
                itemComponent={({ index }) => (
                  <img
                    src={list[index]?.imageUrl ?? ''}
                    alt={list[index]?.artist ?? ''}
                    width={size.height}
                    height={size.width}
                  />
                )}
              />
            ) : null}
            <div className="flex shrink basis-[50%] flex-row justify-center">
              <TextList list={list.filter((_, i) => i < columns * rows)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
