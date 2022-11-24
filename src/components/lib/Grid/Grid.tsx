import { Album } from "../../../styles/types/Albums";
import Image from 'next/image';

export interface Props {
  list: Album[];
}

const Grid: React.FC<Props> = ({
  list,
}) => {
  return (
    <div
      className="
        flex flex-wrap justify-center
        max-h-[80vh]
        overflow-y-scroll
      "
    >
      {list.map((album, index) => (
        <div 
          className="basis-1/3 relative max-w-[50px]"
          key={index+'gfrdi'}
          style={{ height: '40px'}}
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
