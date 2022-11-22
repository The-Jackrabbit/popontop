import { a } from "react-spring";
import MobileSheet from "../../lib/MobileSheet/MobileSheet";
import List from "./List/List";
import SearchAlbums from "./SearchAlbums/SearchAlbums";
import MobileSettings from "./MobileSettings/MobileSettings";
import { ActionBar } from "./ActionBar/ActionBar";
import Title from "./Title/Title";
import useChartList, { UseChartListContext } from "../../../frontend/hooks/use-chart-list";
import { ChartSettings } from "@prisma/client";
import MobilePage from "../../lib/MobilePage/MobilePage";
import { Album } from "../../../styles/types/Albums";
import { useEffect } from "react";

export interface Props {
  chartName?: string;
  chartUuid?: string;
  context?: UseChartListContext;
  initialList?: Album[];
  initialSettings?: ChartSettings | null;
  isLoading?: boolean;
  isReadOnly?: boolean;
}

const MobileEditor: React.FC<Props> = ({
  chartName = 'My chart',
  chartUuid = '',
  context,
  initialList,
  initialSettings = null,
  isLoading = true,
  isReadOnly = false,
}) => {
  const { actions, sheet, state } = useChartList({
    chartUuid,
    chartName,
    context,
    defaultSettings: initialSettings,
    initialList,
  });
  useEffect(() => {
    if (initialList) {
      actions.listMutations.setList(initialList);
    }
  }, [initialList]);
  useEffect(() => {
    if (chartName) {
      actions.setChartTitle(chartName);
    }
  }, [chartName])
  return (
    <MobilePage>
      <a.div
        id="editor"
        onClick={() => actions.onClickSheetDeadArea()}
        style={{ ...sheet.bgStyle, height: sheet.windowHeight }}
      >
        {state.settings.showTitle ? (
          <Title
            textColor={state.settings.textColor}
            isReadOnly={isReadOnly}
            chartTitle={state.chartTitle ?? ''}
            setValue={(value: string) => actions.setChartTitle(value)}
            showIntroduction={state.showIntroduction}
            titleHeightStyle={state.titleHeightStyle}
          />
        ) : null}
        {isLoading ? (
          <div>
            {[...new Array(10)].map((_, index) => (
              <div
                key={index+'loadingchart'}
                className="w-full flex justify-between mb-2"
              >
                <div
                  className="
                    text-xs basis-1/12 
                    w-12
                    flex flex-col shrink-0 justify-center content-center items-center
                  "
                >
                  <p>{1 + index}</p>
                </div>
                <div className="basis-2/12 justify-start">
                  <div
                    className="
                      w-[60px] h-[60px]
                      bg-neutral-200 dark:bg-neutral-700 animate-pulse
                    "></div>
                </div>
                <div
                  className="basis-8/12 ml-2 content-start grow-0 overflow-x-hidden justify-end flex flex-col"
                >
                  <div
                    className="
                      text-xs
                      w-48 h-[16px]
                     bg-neutral-200 dark:bg-neutral-700 mb-1
                      animate-pulse
                    "
                  />
                  <div
                    className="
                      text-xs
                      w-36 h-[16px]
                     bg-neutral-200 dark:bg-neutral-700
                     animate-pulse
                    "
                  />
               </div>
               <div className="basis-1/12"></div>
             </div>
            ))}
          </div>
        ) : (
            <List
              list={state.list}
              listMode={state.listMode}
              onRearrangeClick={actions.onRearrangeClick}
              removeAlbumAtIndex={actions.listMutations.removeAlbumAtIndex}
              showAlbums={state.settings.showAlbums}
              textColor={state.settings.textColor}
            />
          )
        }
        <ActionBar
          isEditLoading={state.isEditLoading}
          className="-translate-x-4"
          editChart={actions.editChart}
          isLoading={state.isLoading}
          listMode={state.listMode}
          onClickSettings={actions.onClickSettings}
          onClickSearch={actions.onClickSearch}
          onClickDeleteMode={actions.onClickDeleteMode}
          onClickRearrangeMode={actions.onClickRearrangeMode}
          hasNonEmptyList={state.list.length > 0}
          isActive={state.isActive}
          isReadOnly={isReadOnly}
          setIsActive={actions.setIsActive}
          saveChart={actions.saveChart}
        />
      </a.div>
      <MobileSheet bind={sheet.bind} display={sheet.display} y={sheet.y}>
        {state.isSearchOpen && (
          <SearchAlbums
            onClick={(album) => actions.listMutations.addAlbumToList(album)}
          />
        )}
        <div style={{ display: state.isSettingsOpen ? 'initial' : 'none' }}>
          <MobileSettings
            isSaveLoading={state.isLoading}
            onSave={actions.saveChart}
            settings={state.settings}
          />
        </div>
      </MobileSheet>
    </MobilePage>
  );
};

export default MobileEditor;
