import { useState } from "react";
import { fakeHttpRequest } from "../../../../utils/fake-http-request";
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

  const search = async (text: string) => {
    console.log({ text });
    try {
      setIsLoading(true);
      const result = await searchAlbums(text);
    } catch {
      console.error('There was an error thrown in the request')
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
    }, 300);

    setTimeoutId(newTimeoutId);
  };

  return (
    <div
      className="h-14 w-full bg-red-red-400"
    >
      <Input value={searchText} placeholder="Search Albums" onChange={(event) => onType(event)} label={""} />


      <div className="mt-4">
        <SearchResults albums={[]} isLoading={true} />
      </div>
    </div>
  );
};

export default SearchAlbums;
