import { Album } from "../../../styles/types/Albums";
import Image from 'next/image';
import { useEffect, useState } from "react";

export interface Props {
  columns: number;
  list: Album[];
  rows: number;
}

const Grid: React.FC<Props> = ({
  columns,
  list,
  rows,
}) => {
  const [squareWidth, setSquareWidth] = useState(40);
  useEffect(() => {
    const container = document.getElementById('container');
    if (container?.clientWidth) {
      const containerWidth = container?.clientWidth ?? 0;
      const containerHeight = container?.clientHeight ?? 0;
      setSquareWidth(
        Math.floor(
          Math.min(
            containerWidth/columns - 6, 
            containerHeight/rows - 6,
          )
        )
      );
    }
  }, [columns, rows]);
  
  return (
    <div
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
              <img
                src={list[cindex+(rows*index)]?.imageUrl ?? ''}
                alt={list[cindex+(rows*index)]?.artist ?? ''}
              />              
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid; 
