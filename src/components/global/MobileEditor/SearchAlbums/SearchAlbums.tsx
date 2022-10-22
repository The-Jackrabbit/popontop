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
  onClick: (album: Album) => void;
}

const SearchAlbums: React.FC<Props> = ({
  onClick,
}) => {
  const [searchText, setSearchText] = useState('');
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const { data, isLoading, refetch } = trpc.albums.search.useQuery({ text: searchText }, {
    enabled: false, // disable this query from automatically running
  });

  const search = async () => {
    await refetch({});
  }

  const onType = (event: { target: { value: string; }; }) => {
    setSearchText(event.target.value)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      search();
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  return (
    <div
      className="h-14 w-full bg-red-red-400"
    >
      <Input value={searchText} placeholder="Search Albums" onChange={(event) => onType(event)} label={""} />

      <div className="mt-4">
        <SearchResults albums={data ?? []} isLoading={isLoading} onClick={onClick} />
      </div>
    </div>
  );
};

export default SearchAlbums;
