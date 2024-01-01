import type { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import { Input } from '../../components/lib/Input/Input';
import { getThemeColorMetaTag } from '../../server/utils/mobile-theme';
import { trpc } from '../../server/utils/trpc';

const Credits: NextPage = () => {
  const [searchText, setSearchText] = useState('');
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const { data, refetch } = trpc.albums.searchArtists.useQuery(
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
  return (
    <div>
      <div className="bg-red-red-400 h-14 w-full">
        <Input
          isMobile={true}
          value={searchText}
          placeholder="Search Albums"
          onChange={(event) => onType(event.target.value)}
        />

        <div className="mt-4 text-white">
          {data?.map((value, index) => (
            <div key={index}>
              <h1>artist: {value.name}</h1>
              <Image
                src={value.imageUrl}
                height="200px"
                width="200px"
                alt={value.name}
              />
            </div>
          ))}

          <br />
          {JSON.stringify(data)}
        </div>
      </div>
    </div>
  );
};

export default Credits;
