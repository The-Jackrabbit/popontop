import React, { Dispatch, SetStateAction } from 'react';
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
import { useSearch } from '../../../../../frontend/hooks/use-chart/use-search';
import DesktopSettings from './DesktopSettings/DesktopSettings';

export interface Props {
  isChartOwner: boolean;
  pageTitle: string;
  pageTitleBorderBottom: Color;
  settings: SettingsHookNode;
  setIsPreviewVisible: Dispatch<SetStateAction<boolean>>;
  isPreviewVisible: boolean;
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
  setIsPreviewVisible,
  isPreviewVisible,
  toggleAlbums,
  toggleTitle,
}) => {
  const { data, onType, searchText } = useSearch();

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
        isChartOwner ? (
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

            <DesktopSettings
              isPreviewVisible={isPreviewVisible}
              setIsPreviewVisible={setIsPreviewVisible}
              settings={settings}
              toggleAlbums={toggleAlbums}
              toggleTitle={toggleTitle}
            />
          </>
        ) : null
      }
    />
  );
};

export default DesktopSidebar;
