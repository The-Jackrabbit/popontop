import { useState } from 'react';
import { Album } from '../../../../../styles/types/Albums';
import { startScreenshotMode } from '../../../../../utils/mobile-theme';
import FilterButton from '../../../../lib/FilterButton/FilterButton';
import Grid, { useSize } from '../../../../lib/Grid/Grid';
import NumberInput from '../../../../lib/NumberInput/NumberInput';
import { ScreenshotMode } from './ScreenshotMode/ScreenshotMode';

export interface Props {
  borderColor: string;
  borderSize: number;
  chartTitle: string;
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
  chartTitle,
  columns,
  list,
  onDecrementColumns,
  onIncrementColumns,
  onDecrementRows,
  onIncrementRows,
  rows,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const onClickPreview = () => {
    setIsOverlayVisible(true);
    startScreenshotMode();
  };
  const onExit = () => setIsOverlayVisible(false);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const size = useSize(target);

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
      ref={setTarget}
    >
      <div className="z-30 basis-[3%]">
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
      </div>
      <FilterButton
        ariaLabel="Enter screenshot mode"
        className={'mb-4 w-min basis-[4%] whitespace-nowrap p-1 '}
        onClick={onClickPreview}
      >
        <p className="p-2 py-1">Enter screenshot mode</p>
      </FilterButton>
      {size ? (
        <Grid
          borderColor={borderColor}
          borderSize={borderSize}
          preview={true}
          itemComponent={({ index }) => (
            <img
              src={list[index]?.imageUrl ?? ''}
              alt={list[index]?.artist ?? ''}
              width={size.height}
              height={size.width}
            />
          )}
          size={size}
          columns={columns}
          rows={rows}
        />
      ) : null}
      {isOverlayVisible ? (
        <ScreenshotMode
          borderColor={borderColor}
          borderSize={borderSize}
          chartTitle={chartTitle}
          columns={columns}
          list={list}
          onExit={onExit}
          rows={rows}
        />
      ) : null}
    </div>
  );
};
