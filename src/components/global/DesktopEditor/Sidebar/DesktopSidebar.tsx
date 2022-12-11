import { useState } from 'react';
import { trpc } from '../../../../utils/trpc';
import Draggable from '../DragNDrop/Draggable/Draggable';
import Image from 'next/image';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';
import { Album } from '../../../../styles/types/Albums';
import TextExpandingPill from '../../../lib/ExpandingPill/TextExpandingPill/TextExpandingPill';
import { SwitchExpandingPill } from '../../../lib/ExpandingPill/SwitchExpandingPill/SwitchExpandingPill';
import NumericExpandingPill from '../../../lib/ExpandingPill/NumericExpandingPill/NumericExpandingPill';
import { colorMap } from '../../../../constants/colors';
import { Color } from './SidebarNav/NavDot/NavDot';
import { SettingsHookNode } from '../../../../frontend/hooks/use-chart/use-chart-settings';
import { SearchResults } from './SearchResults/SearchResults';

export interface Props {
  initialValues?: string[];
  settings: SettingsHookNode;
  toggleAlbums: (value: boolean) => void;
  toggleTitle: (value: boolean) => void;
}

export const DesktopSidebar: React.FC<Props> = ({
  settings,
  toggleAlbums,
  toggleTitle,
}) => {
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
      <h1 className="text-4xl font-bold">create chart</h1>
      <div
        className={`
          ${colorMap[Color.green]}
          shadow-md
          rounded-full w-full h-1 my-4 
        `}
      />
      <div className="flex flex-col justify-center mb-2">
        <TextExpandingPill
          label="Search albums"
          labelClassName="pr-2"
          isActive={true}
          placeholder="Emotion, Dedicated, The Loneliest Time"
          setValue={(value: string) => onType(value)}
          value={searchText}
        />
        {data ? (
          <SearchResults searchResults={data} />
        ): null}
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-center ">
        <TextExpandingPill
          label="Background color"
          labelClassName='pr-2'
          setValue={(value: string) => settings.actions.setBackgroundColor(value)}
          value={settings.state.backgroundColor}
        />
   
        <TextExpandingPill
          label="Text color"
          labelClassName='pr-2'
          setValue={(value: string) => settings.actions.setTextColor(value)}
          value={settings.state.textColor}
        />
   
        <TextExpandingPill
          label="Border color"
          labelClassName='pr-2'
          setValue={(value: string) => settings.actions.setBorderColor(value)}
          value={settings.state.borderColor}
        />

        <SwitchExpandingPill
          className="inline-block"
          label="list albums?"
          labelClassName='pr-2'
          setValue={(value: boolean | null) => toggleAlbums(Boolean(value))}
          value={settings.state.showAlbums}
        />

        <SwitchExpandingPill
          className="inline-block"
          label="show title?"
          labelClassName='pr-2'
          setValue={(value: boolean | null) => {
            debugger;
            toggleTitle(Boolean(value))
          }}
          value={settings.state.showTitle}
        />

        <NumericExpandingPill
          label="Border width"
          labelClassName='pr-2'
          min={0}
          max={10}
          setValue={(value: number) => settings.actions.setBorderSize(value)}
          value={settings.state.borderSize}
        />
      </div>
    </>
  );
}

export default DesktopSidebar;
