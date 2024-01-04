import { useState } from 'react';
import { Album } from '../../../types/Albums';
import { trpc } from '../../../server/utils/trpc';

export type SearchTypes = 'albums' | 'artists';
export const SEARCH_TYPES: SearchTypes[] = ['albums', 'artists'];

export const useSearch = (): {
  data: Album[] | undefined;
  onType: (value: string) => void;
  searchText: string;
  searchType: SearchTypes;
  setSearchType: (value: SearchTypes) => void;
} => {
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState<SearchTypes>('albums');
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const { data: albumsData, refetch: refetchAlbums } =
    trpc.albums.search.useQuery(
      { text: searchText },
      {
        enabled: false,
      }
    );
  const { data: artistsData, refetch: refetchArtists } =
    trpc.albums.searchArtists.useQuery(
      { text: searchText },
      {
        enabled: false,
      }
    );

  const search = async () => {
    if (searchType === 'albums') await refetchAlbums({});
    else if (searchType === 'artists') await refetchArtists({});
  };

  const onType = (value: string) => {
    setSearchText(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      search();
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  return {
    data: searchType === 'albums' ? albumsData : artistsData,
    onType,
    setSearchType,
    searchText,
    searchType,
  };
};
