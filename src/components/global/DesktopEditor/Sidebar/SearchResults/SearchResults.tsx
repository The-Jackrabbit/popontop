import { Album } from '../../../../../types/Albums';
import { Result } from './Result/Result';

export interface Props {
  searchResults: Album[];
}

export const SearchResults: React.FC<Props> = ({ searchResults }) => {
  return (
    <>
      {searchResults.length > 5 ? (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {searchResults.map((result: Album, index: number) => (
            <Result
              album={result}
              className="
                shrink-1 z-50
                inline-flex basis-[calc(50%_-_0.5rem)] cursor-grab rounded-xl bg-black p-4
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
