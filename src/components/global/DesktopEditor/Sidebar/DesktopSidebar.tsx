import { useState } from 'react';
import { trpc } from '../../../../utils/trpc';
import Input from '../../../lib/Input/Input';
import Select from '../../../lib/Select/Select';
import Slider from '../../../lib/Slider/Slider';
import Draggable from '../DragNDrop/Draggable/Draggable';
import styles from './DesktopSidebar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { a, config, useSpring } from 'react-spring';
import SidebarNav from './SidebarNav/SidebarNav';
import { Settings } from '../../../../frontend/hooks/use-chart';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';
import { Album } from '../../../../types/Albums';

export interface Props {
  settings: Settings;
}

export const DesktopSidebar: React.FC<Props> = ({
  settings
}) => {
  const [searchText, setSearchText] = useState('');
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const { data, refetch } = trpc.albums.search.useQuery({ text: searchText }, {
    enabled: false,
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
    <>
      <div className='flex flex-col justify-center '>
        <Input
          autofocus={true}
          value={searchText} 
          placeholder="Search albums" 
          onChange={(event) => onType(event)} 
          label="Search albums"
        />

        <div className="flex ">
          {data && data.length > 5 
          ? (
              <div className="mt-4 flex flex-col w-[200px]">
                {[...new Array(5)].map((v, rowIndex) => (
                  <div key={`sr-row-${rowIndex}`}>
                    {[...new Array(2)].map((v, columnIndex ) => {
                      const index = rowIndex*2 + columnIndex;
                      const album: Album = data ? data[index] as Album : EMPTY_ALBUM;
                      return (
                        <Draggable
                          data={{ data: album as Album, index, origin: 'search' }}
                          id={index.toString()}
                          key={'st-' + index}
                          className="basis-1/2"
                        >
                          <Image
                            width="100px"
                            height="100px"
                            src={album?.imageUrl}
                            className="absolute "
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
      <Select
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no',},
        ]}
        value={settings.data.showTitle ? 'yes' : 'no'}
        setChosenValue={(value) => settings.actions.toggleTitle(value === 'yes')}
        label="Show title?"
        placeholder="Show title?"
        isOpenByDefault={false}
      />

      <Select
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
        value={settings.data.showAlbums ? 'yes' : 'no'}
        setChosenValue={(value) => settings.actions.toggleAlbums(value === 'yes')}
        label="List albums?"
        placeholder="List albums?"
        isOpenByDefault={false}
      />

      <Input
        label={'Border color'}
        onChange={(event) => settings.actions.setBorderColor(event.target.value)}
        placeholder="#adf2da"
        value={settings.data.borderColor}
      />

      <Slider
        min={0}
        max={10}
        onChange={(event) => settings.actions.setBorderSize(parseInt(event?.target.value))}
        label="Border size"
        value={settings.data.borderSize.toString()}
      />

      <Input
        label="Background color"
        onChange={(event) => settings.actions.setBackgroundColor(event?.target.value)}
        placeholder="#adf2da"
        value={settings.data.backgroundColor}
      />

      <Input
        label="Text color"
        onChange={(event) => settings.actions.setTextColor(event?.target.value)}
        placeholder="#adf2da"
        value={settings.data.textColor}
      />
    </>
  );
}

export default DesktopSidebar;
