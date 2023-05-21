import React from 'react';
import { useState } from 'react';
import { trpc } from '../../../../../utils/trpc';
import TextExpandingPill from '../../../../lib/ExpandingPill/TextExpandingPill/TextExpandingPill';
import { SwitchExpandingPill } from '../../../../lib/ExpandingPill/SwitchExpandingPill/SwitchExpandingPill';
import { colorMap } from '../../../../../constants/colors';
import { Color } from './SidebarNav/NavDot/NavDot';
import { SettingsHookNode } from '../../../../../frontend/hooks/use-chart/use-chart-settings';
import { SearchResults } from './SearchResults/SearchResults';
import Layout from './Layout';
import SidebarNav from './SidebarNav/SidebarNav';

export interface Props {
  initialValues?: string[];
  isChartOwner: boolean;
  pageTitle: string;
  pageTitleBorderBottom: Color;
  settings: SettingsHookNode;
  showOnboardingFlow: boolean;
  toggleAlbums: (value: boolean) => void;
  toggleTitle: (value: boolean) => void;
}

export const DesktopSidebar: React.FC<Props> = ({
  isChartOwner,
  pageTitle,
  settings,
  pageTitleBorderBottom,
  showOnboardingFlow,
  toggleAlbums,
  toggleTitle,
}) => {
  const [searchText, setSearchText] = useState('');
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const { data, refetch } = trpc.albums.search.useQuery(
    { text: searchText },
    {
      enabled: false,
    }
  );

  const search = async () => {
    await refetch({});
  };

  const onType = (value: string) => {
    setSearchText(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      search();
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  return (
    <Layout
      title={
        <>
          <h1 className="text-4xl font-bold">{pageTitle}</h1>
          <div
            className={`
              ${colorMap[pageTitleBorderBottom]}
              my-4
              h-1 w-full rounded-full shadow-md
            `}
          />
        </>
      }
      nav={<SidebarNav />}
      sidebarContent={
        !isChartOwner ? null : (
          <>
            <div className="mb-2 flex flex-col justify-center">
              <TextExpandingPill
                label="Search albums"
                isActive={!showOnboardingFlow}
                placeholder="Emotion, Dedicated, The Loneliest Time"
                setValue={(value: string) => onType(value)}
                value={searchText}
              />
              {data ? <SearchResults searchResults={data} /> : null}
            </div>

            <div className="flex flex-row flex-wrap items-center gap-2 ">
              <TextExpandingPill
                label="Title background color"
                setValue={(value: string) =>
                  settings.actions.setTitleBackgroundColor(value)
                }
                value={settings.state.titleBackgroundColor}
              />
              <TextExpandingPill
                label="Background color"
                setValue={(value: string) =>
                  settings.actions.setBackgroundColor(value)
                }
                value={settings.state.backgroundColor}
              />
              <TextExpandingPill
                label="Text color"
                setValue={(value: string) =>
                  settings.actions.setTextColor(value)
                }
                value={settings.state.textColor}
              />
              <TextExpandingPill
                label="Border color"
                setValue={(value: string) =>
                  settings.actions.setBorderColor(value)
                }
                value={settings.state.borderColor}
              />
              <SwitchExpandingPill
                className="inline-block"
                label="list albums?"
                setValue={(value: boolean | null) =>
                  toggleAlbums(Boolean(value))
                }
                value={settings.state.showAlbums}
              />
              <SwitchExpandingPill
                className="inline-block"
                label="show title?"
                setValue={(value: boolean | null) =>
                  toggleTitle(Boolean(value))
                }
                value={settings.state.showTitle}
              />
              {/* <NumericExpandingPill
              label="Number of albums"
              min={0}
              max={100}
              setValue={
                ((value: number) =>
                  settings.actions.setNumberOfAlbums(value)) as any
              }
              value={settings.state.numberOfAlbums}
            /> */}
              {/**

            <NumericExpandingPill
              label="Border width"
              min={0}
              max={10}
              setValue={
                ((value: number) =>
                  settings.actions.setBorderSize(value)) as any
              }
              value={settings.state.borderSize}
            />
              <NumericExpandingPill
                label="Number of columns"
                min={0}
                max={10}
                setValue={
                  ((value: number) => settings.actions.setColumns(value)) as any
                }
                value={settings.state.columns}
              />

              <NumericExpandingPill
                label="Number of rows"
                min={0}
                max={10}
                setValue={
                  ((value: number) => settings.actions.setRows(value)) as any
                }
                value={settings.state.rows}
              />
            */}
            </div>
          </>
        )
      }
    />
  );
};

export default DesktopSidebar;
