import { Album } from "../../../../types/Albums"
import { generateEmptyArrayOfSize } from "../../../../utils/generate-fake-data-in-list";
import { LoadingAlbumSearchResult } from "./LoadingAlbumSearchResult";

export interface Props {
  albums: (Album | null)[];
  isLoading: boolean;
}

const FAKES = generateEmptyArrayOfSize<Album>({
  defaultElement: {
    name: 'Donuts',
  }
});

export const SearchResults: React.FC<Props> = ({ albums, isLoading }) => {
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
          <div className="h-4 bg-red-400 w-full">

          </div>
        )
      }
    </>
  )
}