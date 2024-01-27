import React, { Dispatch, SetStateAction } from 'react';
import { TextAndSwitchExpandingPill } from '../../../../lib/ExpandingPill/TextExpandingPill/TextExpandingPill';
import { colorMap } from '../../../../../constants/colors';
import NavDot, { Color } from './SidebarNav/NavDot/NavDot';
import { SettingsHookNode } from '../../../../../frontend/hooks/use-chart/use-chart-settings';
import { SearchResults } from './SearchResults/SearchResults';
import Layout from './Layout';
import SidebarNav from './SidebarNav/SidebarNav';
import {
  SEARCH_TYPES,
  useSearch,
} from '../../../../../frontend/hooks/use-chart/use-search';
import DesktopSettings from './DesktopSettings/DesktopSettings';

export interface Props {
  isChartOwner: boolean;
  pageTitle: string;
  pageTitleBorderBottom: Color;
  settings: SettingsHookNode;
  setIsPreviewVisible: Dispatch<SetStateAction<boolean>>;
  isPreviewVisible: boolean;
  showOnboardingFlow: boolean;
  toggleEntries: (value: boolean) => void;
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
  toggleEntries,
  toggleTitle,
}) => {
  const { data, onType, searchText, searchType, setSearchType } = useSearch();

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
              <TextAndSwitchExpandingPill
                label="Search albums/artists"
                isActive={!showOnboardingFlow}
                placeholder="Emotion, Dedicated, The Loneliest Time"
                setValue={(value: string) => onType(value)}
                value={searchText}
                switchComponent={
                  <>
                    {SEARCH_TYPES.map((currentSearchType) => (
                      <button
                        key={`option-${currentSearchType}`}
                        className="mb-2 flex flex-row"
                        onClick={() => setSearchType(currentSearchType)}
                      >
                        <NavDot
                          ariaLabel="option"
                          color={
                            searchType === currentSearchType
                              ? Color.amber
                              : Color.blue
                          }
                          isActive={searchType === currentSearchType}
                          className="mr-2 h-3 w-3 border-none"
                          onClick={() => undefined}
                        />
                        <p className=" dark:text-neutral-300">
                          {currentSearchType}
                        </p>
                      </button>
                    ))}
                  </>
                }
              />

              {data ? <SearchResults searchResults={data} /> : null}
            </div>

            <DesktopSettings
              isPreviewVisible={isPreviewVisible}
              setIsPreviewVisible={setIsPreviewVisible}
              settings={settings}
              toggleEntries={toggleEntries}
              toggleTitle={toggleTitle}
            />
          </>
        ) : null
      }
    />
  );
};

export default DesktopSidebar;
