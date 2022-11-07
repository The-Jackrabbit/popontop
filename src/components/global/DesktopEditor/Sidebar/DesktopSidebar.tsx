import { useState } from 'react';
import { trpc } from '../../../../utils/trpc';
import Input from '../../../lib/Input/Input';
import Select from '../../../lib/Select/Select';
import Slider from '../../../lib/Slider/Slider';
import Draggable from '../DragNDrop/Draggable/Draggable';
import Image from 'next/image';
import { Settings } from '../../../../frontend/hooks/use-chart';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';
import { Album } from '../../../../types/Albums';
import { usePillList } from '../../../../frontend/hooks/springs/use-pill-list';
import ExpandingPill from '../../../lib/ExpandingPill/ExpandingPill';

export interface Props {
  initialValues?: string[];
  settings: Settings;
}

export const DesktopSidebar: React.FC<Props> = ({
  initialValues = [
    '',
    '',
    ''
  ],
  settings,
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

  const labels = [
    'background',
    'font color',
    'border color',
  ];
  const setterFunctions = [
    settings.actions.setBackgroundColor,
    settings.actions.setTextColor,
    settings.actions.setBorderColor,
  ];
  const {
    onTypeForInputAtIndex,
    pillValues,
    toggleVisibilityOfInputAtIndex,
    visibilityMap,
  } = usePillList<string>({
    initialValues: [...initialValues],
    setterFunctions,
  });

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

      <div>
      <div className="flex flex-row flex-wrap items-center ">
        {pillValues.map(((pill, index) => (
          <ExpandingPill
            className="m-1"
            isActive={visibilityMap[index] ?? false}
            onChange={(event) => onTypeForInputAtIndex(event, index)}
            key={index}
            label={labels[index] ?? ''}
            toggleVisibility={() => toggleVisibilityOfInputAtIndex(index)}
            value={pill as string}
          />
        )))}
      </div>
    </div>

      {/* <Input
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

      <Input
        label={'Border color'}
        onChange={(event) => settings.actions.setBorderColor(event.target.value)}
        placeholder="#adf2da"
        value={settings.data.borderColor}
      />
       */}
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

      <Slider
        min={0}
        max={10}
        onChange={(event) => settings.actions.setBorderSize(parseInt(event?.target.value))}
        label="Border size"
        value={settings.data.borderSize.toString()}
      />

    </>
  );
}

export default DesktopSidebar;
