import { Album } from "../../../../../types/Albums"
import { generateEmptyArrayOfSize } from "../../../../../utils/generate-fake-data-in-list";
import MobileSearchResult from "../../../../lib/Mobile/MobileSearchResult/MobileSearchResult";
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
          <div className="w-full overflow-y-scroll h-[50%]">
            {albums.map((album: Album, index:number) => (
              <MobileSearchResult
                album={album}
                isLastRowInList={false}
                key={JSON.stringify(album)+index}
                onClick={() => onClick(album)}
              />
            ))}
          </div>
        )
      }
    </>
  )
}