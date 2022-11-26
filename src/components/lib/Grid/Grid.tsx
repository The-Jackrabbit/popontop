import { Album } from "../../../styles/types/Albums";
import { createRef, useEffect, useState } from "react";

export interface Props {
  columns: number;
  list: Album[];
  rows: number;
}

export const getAlbumSize = (ref: any, columns: number, rows: number) => {
  const container = ref.current;
  if (!container?.clientWidth) {
    return 0;
  }

  const containerWidth = container?.clientWidth ?? 0;
  const containerHeight = container?.clientHeight ?? 0;
  return Math.floor(
    Math.min(
      containerWidth/columns - 6, 
      (containerHeight-40)/rows - 6,
    )
  );
}

const Grid: React.FC<Props> = ({
  columns,
  list,
  rows,
}) => {
  const [squareWidth, setSquareWidth] = useState(40);
  const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    setSquareWidth(getAlbumSize(ref, columns, rows));
  }, [columns, rows, ref.current]);
  return (
    <div
      ref={ref}
      id="container"
      className="
        flex flex-wrap justify-center
        h-[80vh] w-full
        overflow-y-scroll
      "
    >
      {[...new Array(columns)].map((_, index) => (
        <div className="row" key={'row'+index}>
          {[...new Array(rows)].map((_, cindex) => (
            <div className="value" key={'row'+index+cindex}
              style={{ width: squareWidth, height: squareWidth}}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={list[index+(columns*cindex)]?.imageUrl ?? ''}
                alt={list[index+(columns*cindex)]?.artist ?? ''}
              />              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid; 
