import { Album } from "../../../styles/types/Albums";
import Image from 'next/image';
import { useEffect, useState } from "react";

export interface Props {
  columns: number;
  list: Album[];
}

const Grid: React.FC<Props> = ({
  columns,
  list,
}) => {
  const [squareWidth, setSquareWidth] = useState(40);
  useEffect(() => {
    const container = document.getElementById('container');
    if (container?.clientWidth) {
      const containerWidth = container?.clientWidth;
      setSquareWidth(Math.floor(containerWidth/columns)-1);
    }
  }, [columns]);
  
  return (
    <div
      id="container"
      className="
        flex flex-wrap justify-center
        max-h-[80vh] w-full
        overflow-y-scroll
      "

    >
      {list.map((album, index) => (
        <div 
          className="relative"
          key={index+'gfrdi'}
          style={{ width: `${squareWidth}px`, height: `${squareWidth}px` }}
        >
          <Image
            layout='fill'
            src={album.imageUrl}
            alt={album.artist}
          />
        </div>
      ))}
    </div>
  );
};

export default Grid; 
