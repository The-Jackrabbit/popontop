import { useState } from 'react';
import { EMPTY_ALBUM } from '../../../../../constants/empty-album';
import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../../types/Albums';
import { startScreenshotMode } from '../../../../../utils/mobile-theme';
import FilterButton from '../../../../lib/FilterButton/FilterButton';
import Grid from '../../../../lib/Grid/Grid';
import ChartItem from '../../../DesktopEditor/DesktopChart/ChartItem/ChartItem';
import { getBorderSizes } from '../../../DesktopEditor/DesktopChart/DesktopChart';
import { ScreenshotMode } from './ScreenshotMode/ScreenshotMode';

export interface Props {
  borderColor: string;
  borderSize: number;
  chart: ChartHookNode;
  columns: number;
  list: Album[];
  onDecrementColumns: () => void;
  onIncrementColumns: () => void;
  onDecrementRows: () => void;
  onIncrementRows: () => void;
  rows: number;
}

export const PreviewEditor: React.FC<Props> = ({
  borderColor,
  borderSize,
  chart,
  columns,
  list,
  // onDecrementColumns,
  // onIncrementColumns,
  // onDecrementRows,
  // onIncrementRows,
  rows,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const onClickPreview = () => {
    setIsOverlayVisible(true);
    startScreenshotMode();
  };
  const onExit = () => setIsOverlayVisible(false);

  return (
    <div
      className={`
        flex
        h-screen w-screen
        flex-col items-stretch
        bg-white
        p-12 align-middle
        dark:bg-black dark:text-white
      `}
    >
      {/* <div className="z-30 basis-[3%]">
        <NumberInput
          className="mb-4 flex w-full justify-between"
          currentValue={rows}
          label="number of rows"
          onDecrement={onDecrementRows}
          onIncrement={onIncrementRows}
        />
      </div>
      <div className="shrink grow-0 basis-[3%]">
        <NumberInput
          className="mb-4 flex w-full justify-between"
          currentValue={columns}
          label="number of columns"
          onDecrement={onDecrementColumns}
          onIncrement={onIncrementColumns}
        />
      </div> */}
      <FilterButton
        ariaLabel="Enter screenshot mode"
        className={'mb-4 w-min basis-[4%] whitespace-nowrap p-1 '}
        onClick={onClickPreview}
      >
        <p className="p-2 py-1">Enter screenshot mode</p>
      </FilterButton>
      <Grid
        borderColor={borderColor}
        borderSize={borderSize}
        preview={true}
        items={list}
        itemComponent={({ index, x, y }) => (
          <ChartItem
            album={
              list[index] !== undefined ? (list[index] as Album) : EMPTY_ALBUM
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
      {isOverlayVisible ? (
        <ScreenshotMode
          borderColor={borderColor}
          borderSize={borderSize}
          chart={chart}
          columns={columns}
          list={list}
          onExit={onExit}
          rows={rows}
        />
      ) : null}
    </div>
  );
};
