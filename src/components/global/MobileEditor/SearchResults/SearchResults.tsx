import Image from "next/image";
import { Album } from "../../../../types/Albums"
import { generateEmptyArrayOfSize } from "../../../../utils/generate-fake-data-in-list";
import { LoadingAlbumSearchResult } from "./LoadingAlbumSearchResult";

export interface Props {
  albums: Album[];
  isLoading: boolean;
  onClick: (album: Album) => void;
}

const FAKES = generateEmptyArrayOfSize<Album>({
  defaultElement: {
    name: 'Donuts',
    artist: 'Fake',
    imageUrl: '',
    lastfmId: '123',
  }
});

export const SearchResults: React.FC<Props> = ({ albums, isLoading, onClick }) => {
  return (
    <>
      {isLoading
        ? (
          <div className="w-full">
            {FAKES.map((album: Album, index: number) => (
              <LoadingAlbumSearchResult
                key={JSON.stringify(album) + index}
              />
            ))}
          </div>
        ) 
        : (
          <div className="w-full overflow-y-scroll h-96">
            {albums.map((album: Album, index: number) => (
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

                <div
                  onClick={() => onClick(album)}
                  className="dark:text-neutral-50 align-end"
                >
                  +
                </div>
              </div>
            ))}
          </div>
        )
      }
    </>
  )
}