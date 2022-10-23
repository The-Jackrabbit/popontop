import { Album } from "../../../../../types/Albums"
import { generateEmptyArrayOfSize } from "../../../../../utils/generate-fake-data-in-list";

export interface Props {
  album: Album;
  isLoading: boolean;
}

export const SearchResults: React.FC<Props> = ({ album, isLoading }) => {
  return (
    <div
      key={JSON.stringify(album)}
      className="bg-red-600 h-4 mb-2"
    >

    </div>
  )
}