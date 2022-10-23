import { useState } from "react";
import { Album } from "../../../../types/Albums";
import { trpc } from "../../../../utils/trpc";
import Input from "../../../lib/Input/Input";
import { SearchResults } from "./SearchResults/SearchResults";

export interface Props {
  onClick: (album: Album) => void;
}

const SearchAlbums: React.FC<Props> = ({
  onClick,
}) => {
  const [searchText, setSearchText] = useState('');
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const { data, isLoading, refetch, isFetching } = trpc.albums.search.useQuery({ text: searchText }, {
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
    <div className="h-14 w-full bg-red-red-400">
      <Input value={searchText} placeholder="Search Albums" onChange={(event) => onType(event)} label={""} />

      <div className="mt-4">
        <SearchResults albums={data ?? []} isLoading={isLoading && isFetching} onClick={onClick} />
      </div>
    </div>
  );
};

export default SearchAlbums;
