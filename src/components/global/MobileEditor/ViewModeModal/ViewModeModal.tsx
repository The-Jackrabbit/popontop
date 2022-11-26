import { Album } from "../../../../styles/types/Albums";
import Grid from "../../../lib/Grid/Grid";
import NumberInput, { useIncrementer } from "../../../lib/NumberInput/NumberInput";

export interface Props {
  columns: number;
  list: Album[];
  onDecrementColumns: () => void;
  onIncrementColumns: () => void;
  onDecrementRows: () => void;
  onIncrementRows: () => void;
  rows: number;
}
export const ViewModeModal: React.FC<Props> = ({
  columns,
  list,
  onDecrementColumns,
  onIncrementColumns,
  onDecrementRows,
  onIncrementRows,
  rows,
}) => {
  return (
    <div
      className="
        w-[calc(100%_-_24px)] m-4
        dark:text-white
      "
    >
      <NumberInput
        className="flex w-full justify-between mb-4"
        currentValue={rows}
        label="number of rows"
        onDecrement={onDecrementRows}
        onIncrement={onIncrementRows}
      />

      <NumberInput
        className="flex w-full justify-between mb-4"
        currentValue={columns}
        label="number of columns"
        onDecrement={onDecrementColumns}
        onIncrement={onIncrementColumns}
      />

      <Grid
        list={list}
        columns={columns}
        rows={rows}
      />
    </div>
  )
};

export default ViewModeModal;
