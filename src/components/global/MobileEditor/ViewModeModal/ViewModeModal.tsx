import { useState } from "react";
import { Album } from "../../../../styles/types/Albums";
import Grid from "../../../lib/Grid/Grid";
import NumberInput from "../../../lib/NumberInput/NumberInput";

export interface Props {
  list: Album[];
}
export const ViewModeModal: React.FC<Props> = ({ list }) => {
  const [numberOfColumns, setNumberOfColumns] = useState(5);

  
  const onDecrement = () => setNumberOfColumns(numberOfColumns - 1);
  const onIncrement = () => setNumberOfColumns(numberOfColumns + 1);
  return (
    <div
      className="
        w-[calc(100%_-_24px)] m-4
        dark:text-white
      "
    >
      <NumberInput
        className="flex w-full justify-between mb-4"
        currentValue={numberOfColumns}
        label="number of rows"
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />

      <Grid list={list} columns={numberOfColumns} />
    </div>
  )
};

export default ViewModeModal;
