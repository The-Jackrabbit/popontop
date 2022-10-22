import { useEffect, useState } from "react";
import { Album } from "../../../../types/Albums";
import { fakeHttpRequest } from "../../../../utils/fake-http-request";
import { trpc } from "../../../../utils/trpc";
import Input from "../../../lib/Input/Input";
import { SearchResults } from "../SearchResults/SearchResults";

async function searchAlbums(_text: string): Promise<any> {
  await fakeHttpRequest({ albums: []})
}

export interface Props {
  onClick: () => void;
}

const SearchAlbums: React.FC<Props> = ({
  onClick,
}) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(!false);
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);
  const [albums, setalbums] = useState<Album[]>([]);

  const { data, refetch } = trpc.albums.search.useQuery({ text: searchText }, {
    enabled: false, // disable this query from automatically running
  });

  const search = async (text: string) => {
    console.log({ text });
    try {
      setIsLoading(true);
    
      const { data } = await refetch({  });

      console.log({ data })

      setalbums(data as unknown as Album[]);
    } catch (e) {
      // debugger;
      console.error('There was an error thrown in the')
    } finally {
      setIsLoading(false);
    }
  }


  const onType = (event: { target: { value: string; }; }) => {
    setSearchText(event.target.value)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      search(event.target.value);
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  return (
    <div
      className="h-14 w-full bg-red-red-400"
    >
      <Input value={searchText} placeholder="Search Albums" onChange={(event) => onType(event)} label={""} />

      <div className="mt-4">
        <code>{JSON.stringify(albums)}</code>
        <SearchResults albums={albums} isLoading={true} />
      </div>
    </div>
  );
};

export default SearchAlbums;
