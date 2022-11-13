import { useState } from 'react';
import { trpc } from '../../../../utils/trpc';
import Draggable from '../DragNDrop/Draggable/Draggable';
import Image from 'next/image';
import { Settings } from '../../../../frontend/hooks/use-chart';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';
import { Album } from '../../../../types/Albums';
import TextExpandingPill from '../../../lib/ExpandingPill/TextExpandingPill/TextExpandingPill';
import { SwitchExpandingPill } from '../../../lib/ExpandingPill/SwitchExpandingPill/SwitchExpandingPill';
import NumericExpandingPill from '../../../lib/ExpandingPill/NumericExpandingPill/NumericExpandingPill';

export interface Props {
  initialValues?: string[];
  settings: Settings;
}

export const DesktopSidebar: React.FC<Props> = ({ settings }) => {
  const [searchText, setSearchText] = useState('');
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const { data, refetch } = trpc.albums.search.useQuery({ text: searchText }, {
    enabled: false,
  });

  const search = async () => {
    await refetch({});
  }

  const onType = (value: string) => {
    setSearchText(value)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      search();
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  return (
    <>
      <div className='flex flex-col justify-center mb-2'>
        <TextExpandingPill
          label="Search albums"
          labelClassName='pr-2'
          setValue={(value: string) => onType(value)}
          value={searchText}
        />

        <div className="flex ">
          {data && data.length > 5 
          ? (
              <div className="mt-4 flex flex-col">
                {[...new Array(5)].map((v, rowIndex) => (
                  <div className="flex gap-2 my-1" key={`sr-row-${rowIndex}`}>
                    {[...new Array(2)].map((v, columnIndex ) => {
                      const index = rowIndex*2 + columnIndex;
                      const album: Album = data ? data[index] as Album : EMPTY_ALBUM;
                      return (
                        <Draggable
                          data={{ data: album as Album, index, origin: 'search' }}
                          id={`results-${index.toString()}`}
                          key={'search-results-' + JSON.stringify(album) + index}
                          className=" relative basis-1/2 p-5 pl-4 pb-4 bg-black rounded-xl"
                        >
                          <p 
                            className="
                              absolute right-0 top-0 
                              p-3
                              -translate-y-2
                              cursor-move
                            "
                          >
                            +
                          </p>
                          <Image
                            width="100px"
                            height="100px"
                            src={album?.imageUrl}
                            className="rounded-tr-full absolute text-white"
                            alt={album?.artist}
                          />
                        </Draggable>
                      );
                    })}
                  </div>
                ))}
              </div>
            )
          : null}
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-center ">
        <TextExpandingPill
          label="Background color"
          labelClassName='pr-2'
          setValue={(value: string) => settings.actions.setBackgroundColor(value)}
          value={settings.data.backgroundColor}
        />
   
        <TextExpandingPill
          label="Text color"
          labelClassName='pr-2'
          setValue={(value: string) => settings.actions.setTextColor(value)}
          value={settings.data.textColor}
        />
   
        <TextExpandingPill
          label="Border color"
          labelClassName='pr-2'
          setValue={(value: string) => settings.actions.setBorderColor(value)}
          value={settings.data.borderColor}
        />

        <SwitchExpandingPill
          className="inline-block"
          label="list albums?"
          labelClassName='pr-2'
          setValue={(value: boolean | null) =>settings.actions.toggleAlbums(Boolean(value))}
          value={settings.data.showAlbums}
        />

        <SwitchExpandingPill
          className="inline-block"
          label="show title?"
          labelClassName='pr-2'
          setValue={(value: boolean | null) =>settings.actions.toggleTitle(Boolean(value))}
          value={settings.data.showTitle}
        />

        <NumericExpandingPill
          label="Border width"
          labelClassName='pr-2'
          min={0}
          max={10}
          setValue={(value: number) => settings.actions.setBorderSize(value)}
          value={settings.data.borderSize}
        />
      </div>
    </>
  );
}

export default DesktopSidebar;
