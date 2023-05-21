import { useState } from 'react';
import { Album } from '../../../types/Albums';
import { trpc } from '../../../utils/trpc';

export const useSearch = (): {
  data: Album[] | undefined;
  onType: (value: string) => void;
  searchText: string;
} => {
  const [searchText, setSearchText] = useState('');
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const { data, refetch } = trpc.albums.search.useQuery(
    { text: searchText },
    {
      enabled: false,
    }
  );

  const search = async () => {
    await refetch({});
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
    data,
    onType,
    searchText,
  };
};
