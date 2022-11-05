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

export interface Props {
  showAlbums: boolean;
  setShowAlbums: (value: boolean) => void;
  showTitle: boolean;
  setShowTitle: (value: boolean) => void;
  borderColor: string;
  setBorderColor: (value: string) => void;
  textColor: string;
  setTextColor: (value: string) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  borderSize: number;
  setBorderSize: (value: number) => void;
  numberOfRows: number;
  setNumberOfRows: (value: number) => void;
  numberOfColumns: number;
  setNumberOfColumns: (value: number) => void;
  page: string;
  setPage: (page: string) => void;
}

export const DesktopSidebar: React.FC<Props> = ({
  setShowAlbums,
  showAlbums,
  showTitle,
  setShowTitle,
  borderColor,
  setBorderColor,
  textColor,
  setTextColor,
  backgroundColor,
  setBackgroundColor,
  borderSize,
  setBorderSize,
  numberOfRows,
  setNumberOfRows,
  numberOfColumns,
  setNumberOfColumns,
  page,
  setPage,
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
    <div
      className={`
        p-4 h-screen
        flex flex-col justify-between
        border-r-2 border-neutral-300 dark:border-neutral-600
        z-50
        w-44 sm:w-48 md:w-56 lg:w-64
      `}
    >
      <div className="mt-2">
        <div className='flex flex-col justify-center items-center align-middle'>
          <Input
            value={searchText} 
            placeholder="Search Albums" 
            onChange={(event) => onType(event)} 
            label={""}
          />

          <div className="mt-4 align-middle justify-center w-[200px]">
            {data?.map(((album, index) => (
              <Draggable
                data={{ data: album, index, origin: 'search' }}
                id={`results-${index.toString()}`}
                key={index}
              >
                <Image
                  width="100px"
                  height="100px"
                  src={album.imageUrl}
                  className="absolute"
                  alt={album.artist}
                />
              </Draggable>
            )))}
          </div>
        </div>
          <Select
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no',},
            ]}
            value={showTitle ? 'yes' : 'no'}
            setChosenValue={(value) => setShowTitle(value === 'yes')}
            label="Show title?"
            placeholder="Show title?"
            isOpenByDefault={false}
          />

          <Select
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
            value={showAlbums ? 'yes' : 'no'}
            setChosenValue={(value) => setShowAlbums(value === 'yes')}
            label="List albums?"
            placeholder="List albums?"
            isOpenByDefault={false}
          />

          <Input
            label={'Border color'}
            onChange={(event) => setBorderColor(event.target.value)}
            placeholder="#adf2da"
            value={borderColor}
          />

          <Slider
            min={0}
            max={10}
            onChange={(event) => setBorderSize(parseInt(event?.target.value))}
            label="Border size"
            value={borderSize.toString()}
          />

          <Input
            label="Background color"
            onChange={(event) => setBackgroundColor(event?.target.value)}
            placeholder="#adf2da"
            value={backgroundColor}
          />

          <Input
            label="Text color"
            onChange={(event) => setTextColor(event?.target.value)}
            placeholder="#adf2da"
            value={textColor}
          />
      </div>
      <SidebarNav
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default DesktopSidebar;