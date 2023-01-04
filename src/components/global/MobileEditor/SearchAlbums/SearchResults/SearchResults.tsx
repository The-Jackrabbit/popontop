import { Album } from '../../../../../types/Albums';
import { generateEmptyArrayOfSize } from '../../../../../utils/generate-fake-data-in-list';
import ListRow, { ListRowMode } from '../../../../lib/Mobile/ListRow/ListRow';
import { LoadingAlbumSearchResult } from './LoadingAlbumSearchResult';

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
  },
});

export const SearchResults: React.FC<Props> = ({
  albums,
  isLoading,
  onClick,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="w-full">
          {FAKES.map((album: Album, index: number) => (
            <LoadingAlbumSearchResult key={JSON.stringify(album) + index} />
          ))}
        </div>
      ) : (
        <div className="h-[50%] w-full">
          {albums.map((album: Album, index: number) => (
            <ListRow
              album={album}
              index={index}
              key={JSON.stringify(album) + index}
              showAlbums={true}
              isLastRowInList={index === albums.length - 1}
              mode={ListRowMode.SEARCH}
              onClick={() => onClick(album)}
            />
          ))}
        </div>
      )}
    </>
  );
};
