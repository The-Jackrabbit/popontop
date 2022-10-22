import { Album } from "../../../types/Albums";
import Image from "next/image";

export interface Props {
  list: Album[];
  removeAlbumAtIndex: (index: number) => void;
  advanceAlbumAtIndex: (index: number) => void;
  lowerAlbumAtIndex: (index: number) => void;
}

const List: React.FC<Props> = ({ list, removeAlbumAtIndex, advanceAlbumAtIndex, lowerAlbumAtIndex}) => {
  return (
    <div className="overflow-y-scroll h-screen">
      {list.map((album, index) => (
        <div
          key={JSON.stringify(album) + index}
          className="
            flex flex-row
            dark:border-neutral-500 border-b pb-2 mb-2
            w-full justify-between
          "
        >
          <div>
            <div  className="dark:text-neutral-200 text-neutral-600" onClick={() => advanceAlbumAtIndex(index)}>
              ^
            </div>
            <div className="dark:text-neutral-200 text-neutral-600"  onClick={() => lowerAlbumAtIndex(index)}>
              v
            </div>
          </div>
          <div>
            <Image width="50" height="50" src={album.imageUrl} alt={album.artist} />
          </div>
          <div className="pl-4 basis-8/12">
            <p>{album.artist}</p>
            <p>{album.name}</p>
          </div>

          <div className="basis-2/12 flex justify-end">
            <div
              onClick={() => removeAlbumAtIndex(index)}
              className="
                flex justify-center content-center
                circle-button
                border
                h-6 w-6 leading-6 text-xs
                rounded-full
                dark:border-neutral-300
                dark:text-neutral-50
              "
            >
              -
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default List;
