import { useState } from 'react';
import { trpc } from '../../../../utils/trpc';
import Input from '../../../lib/Input/Input';
import Select from '../../../lib/Select/Select';
import Slider from '../../../lib/Slider/Slider';
import Draggable from '../DragNDrop/Draggable/Draggable';
import styles from './DesktopSidebar.module.css';
import Image from 'next/image';

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
}) => {
  const [chartType, setChartType] = useState('');  
  const [albumPadding, setAlbumPadding] = useState('');
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
    <div
      className={`
        ${styles.sidebar}
        p-4 h-screen
        flex flex-col justify-between
        border-r-2
        w-44 sm:w-48 md:w-56 lg:w-64 overflow-x-hidden
      `}>
      <div className={styles.sidebarSettings}>
        <div>
        <Input value={searchText} placeholder="Search Albums" onChange={(event) => onType(event)} label={""} />

      <div className="mt-4 w-full">
        {data?.map(((album, index) => (
          <>
            <Draggable
              data={{
                album,
                index,
              }}
              id={`results-${index.toString()}`}
              key={index}
            >
              <Image
                width="100px"
                height="100px"
                src={album.imageUrl}
                alt={album.artist}
              />
            </Draggable>
          </>
        )))}
      </div>
        </div>
        <div>
          <Select
            options={[
              {
                label: 'Top 100',
                value: 'top-100',
              },
              {
                label: 'Top 50',
                value: 'top-50',
              },
              {
                label: 'Grid',
                value: 'grid',
              },
            ]}
            value={chartType}
            setChosenValue={(val) => setChartType(val)}
            label="Chart type"
            placeholder="Chart type"
            isOpenByDefault={false}
          />
        </div>
        <div>
          <Select
            options={[
              {
                label: 'Yes',
                value: 'yes',
              },
              {
                label: 'No',
                value: 'no',
              },
            ]}
            value={showTitle ? 'yes' : 'no'}
            setChosenValue={(value) => setShowTitle(value === 'yes')}
            label="Show title?"
            placeholder="Show title?"
            isOpenByDefault={false}
          />
        </div>
        <div>
          <Select
            options={[
              {
                label: 'Yes',
                value: 'yes',
              },
              {
                label: 'No',
                value: 'no',
              },
            ]}
            value={showAlbums ? 'yes' : 'no'}
            setChosenValue={(value) => {
              setShowAlbums(value === 'yes')
            }}
            label="List albums?"
            placeholder="List albums?"
            isOpenByDefault={false}
          />
        </div>
        <div>
          <Slider
            min={0}
            max={10}
            onChange={(event) => setAlbumPadding(event.target.value)}
            label="Album padding"
            value={albumPadding}
          />
        </div>
        <div>
          <Input
            label={'Border color'}
            onChange={(event) => setBorderColor(event.target.value)}
            placeholder="#adf2da"
            value={borderColor}
          />
        </div>
        <div>
          <Slider
            min={0}
            max={10}
            onChange={(event) => {
              debugger;
              setBorderSize(parseInt(event?.target.value))
            }}
            label="Border size"
            value={borderSize.toString()}
          />
        </div>
        <div>
          <Input
            label="Background color"
            onChange={(event) => setBackgroundColor(event?.target.value)}
            placeholder="#adf2da"
            value={backgroundColor}
          />
        </div>
        <div>
          <Input
            label="Text color"
            onChange={(event) => setTextColor(event?.target.value)}
            placeholder="#adf2da"
            value={textColor}
          />
        </div>
      </div>
      <div className=" flex flex-row justify-between">
        
      <div className={styles.logo + " text-5xl"}>
        <h1
          className="
            bg-white dark:bg-black
            px-2 py-1 py-1sm:px-4 sm:py-1
            rounded-full
            text-2xl
          "
        >
          💿popontop
        </h1>
      </div>
      </div>
    </div>
  );
}

export default DesktopSidebar;