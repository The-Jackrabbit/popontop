import { useState } from "react";
import { Album } from "../../../../../styles/types/Albums";
import { startScreenshotMode } from "../../../../../utils/mobile-theme";
import FilterButton from "../../../../lib/FilterButton/FilterButton";
import Grid, { useSize } from "../../../../lib/Grid/Grid";
import NumberInput from "../../../../lib/NumberInput/NumberInput";
import { ScreenshotMode } from "./ScreenshotMode/ScreenshotMode"

export interface Props {
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
        dark:text-white
        bg-white dark:bg-black
        h-screen w-screen
        p-12
        flex flex-col
        align-middle items-stretch
      `}
      ref={setTarget}
    >
      <div className="basis-[3%] z-30">
        <NumberInput
          className="flex w-full justify-between mb-4"
          currentValue={rows}
          label="number of rows"
          onDecrement={onDecrementRows}
          onIncrement={onIncrementRows}
        />
      </div>
      <div className="basis-[3%] grow-0 shrink">
        <NumberInput
          className="flex w-full justify-between mb-4"
          currentValue={columns}
          label="number of columns"
          onDecrement={onDecrementColumns}
          onIncrement={onIncrementColumns}
        />
      </div>
      <FilterButton
        ariaLabel="Enter screenshot mode"
        className={"w-min whitespace-nowrap p-1 basis-[4%] mb-4 "}
        onClick={onClickPreview}
      >
        <p className="p-2 py-1">Enter screenshot mode</p>
      </FilterButton>
      {size ? (
        <Grid
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
          chartTitle={chartTitle}
          columns={columns}
          list={list}
          onExit={onExit} 
          rows={rows}
        /> 
      ) : null}
    </div>
  );
} 