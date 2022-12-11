import { Album } from "../../../../../styles/types/Albums";
import { Result } from "./Result/Result";

export interface Props {
  searchResults: Album[];
}

export const SearchResults: React.FC<Props> = ({
  searchResults,
}) => {
  return (
    <>
      {searchResults.length > 5 ? (
        <div className="mt-4 flex justify-center flex-wrap gap-2">
          {searchResults.map((result: Album, index: number) => (
            <Result
              album={result}
              className="
                inline-flex cursor-grab
                basis-[calc(50%_-_0.5rem)] shrink-1 p-4 bg-black rounded-xl z-50
              "
              index={index}
              key={index + 'search-result'}
            /> 
          ))}
        </div>
      ) : null}
    </>
  );
};
