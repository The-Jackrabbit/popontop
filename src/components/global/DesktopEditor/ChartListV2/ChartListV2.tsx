import React from "react";
import { Album } from "../../../../styles/types/Albums";

export interface Props {
  columnCount?: number;
  list: Album[];
}

const ChartListV2: React.FC<Props> = ({ columnCount = 3, list }) => {
  return (
    <div
      className="
        oveflow-x-hidden // 
        <-
        this
        is to
        make sure the numbers on the leftmost row show up in the contianer TODO: find more elegant fix list-decimal text-ellipsis whitespace-nowrap pl-6 text-xs dark:text-neutral-50
      "
      role="list"
    >
      {[...new Array(100)].map((_, index) => (
        <div
          className="
            w-14 overflow-hidden text-ellipsis leading-tight
            sm:w-24 md:w-64 lg:w-72
          "
          key={index + "album-list"}
          role="listitem"
        >
          {list[index]?.artist} - {list[index]?.name}
        </div>
      ))}
    </div>
  );
};

export default ChartListV2;
