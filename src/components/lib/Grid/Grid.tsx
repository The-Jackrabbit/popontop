import { Album } from "../../../styles/types/Albums";
import { createRef, useEffect, useState } from "react";

export interface Props {
  columns: number;
  list: Album[];
  preview?: boolean;
  rows: number;
}

export const getAlbumSize = (ref: any, columns: number, rows: number) => {
  const container = ref.current;
  if (!container?.clientWidth) {
    return 0;
  }

  const containerWidth = document.body.clientWidth ?? 0;
  const containerHeight = container.clientHeight ?? 0;
  return Math.floor(
    Math.min(
      containerWidth/columns , 
      (containerHeight-40)/rows ,
    )
  );
}

const Grid: React.FC<Props> = ({
  columns,
  list,
  preview = false,
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
      className={`
      ${preview ? 'scale-95' : ''}
        flex justify-center
        grow h-fit
        overflow-y-scroll
      `}
    >
      {/* <div className={preview ? 'scale-50' : ''}> */}
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
      {/* </div> */}
    </div>
  );
};

export default Grid; 
