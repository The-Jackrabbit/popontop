import { Album } from "../../../types/Albums";
import Image from "next/image";

export interface Props {
  list: Album[];
  removeAlbumAtIndex: (index: number) => void;
}

const List: React.FC<Props> = ({ list, removeAlbumAtIndex }) => {
  return (
    <div className="overflow-y-scroll h-screen">
      {list.map((album, index) => (
        <div key={index} className="mb-4 w-screen h-12 dark:bg-neutral-300">
           <div
                key={JSON.stringify(album) + index}
            className="
              flex flex-row
              dark:border-neutral-200 border-b pb-2 mb-2
            "
          >
            <div>
              <Image width="50" height="50" src={album.imageUrl} alt={album.artist} />
            </div>
            <div className="pl-4 basis-10/12">
              <p>{album.artist}</p>
              <p>{album.name}</p>
            </div>

            <div className="dark:text-neutral-50 align-end" onClick={() => removeAlbumAtIndex(index)}>-</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
