import { HomeIcon } from '@heroicons/react/20/solid';
import { Dispatch, SetStateAction, useState } from 'react';
import { colorMap } from '../../../../../constants/colors';
import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../../types/Albums';
import {
  resetThemeColorMetaTag,
  startScreenshotMode,
} from '../../../../../server/utils/mobile-theme';
import FilterButton from '../../../../lib/FilterButton/FilterButton';
import { Color } from '../../../Desktop/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import { ScreenshotMode } from './ScreenshotMode/ScreenshotMode';
import { DesktopPreview } from '../../../Desktop/DesktopPreview/DesktopPreview';
import { NumericExpandingPillContent } from '../../../../lib/ExpandingPill/NumericExpandingPill/NumericExpandingPill';
import { CHART_TEMPLATES } from '../../../../../constants/chart-types';

export interface Props {
  borderColor: string;
  borderSize: number;
  chart: ChartHookNode;
  list: Album[];
  previewIndex: number;
  setPreviewIndex: Dispatch<SetStateAction<number>>;
}

export const PreviewEditor: React.FC<Props> = ({
  borderColor,
  borderSize,
  chart,
  list,
  previewIndex,
  setPreviewIndex,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const onClickPreview = () => {
    setIsOverlayVisible(true);
    startScreenshotMode(chart.settings.state.backgroundColor);
  };
  const onExit = () => {
    resetThemeColorMetaTag();
    setIsOverlayVisible(false);
  };

  return (
    <div
      className={`
        flex
        h-full w-screen
        flex-col items-stretch
        justify-between
        bg-[#f8f9f8] p-4
        align-middle dark:bg-neutral-900
      `}
    >
      <div className="overflow-y-hidden">
        <h2 className="text-3xl font-bold">share</h2>
        <div
          className={`
          ${colorMap[Color.green]}
          my-4
          h-1 w-full rounded-full shadow-md
        `}
        ></div>
        <p className="my-4">
          Once in screenshot mode, tap anywhere on your screen to exit out
        </p>
        <p className="mb-4">
          Click the{' '}
          <HomeIcon
            className={
              'inline h-6 w-6 translate-y-[1px] text-neutral-900 dark:text-neutral-50'
            }
          />{' '}
          button to go back to the list editor
        </p>
        <DesktopPreview
          isMobile={true}
          chart={chart}
          previewIndex={previewIndex}
        />
      </div>
      <div className="flex gap-8 overflow-y-hidden p-2">
        <div className="basis-1/3">
          <NumericExpandingPillContent
            max={Object.keys(CHART_TEMPLATES).length - 1}
            min={0}
            setValue={setPreviewIndex}
            textColor={chart.settings.state.textColor}
            value={previewIndex}
          />
        </div>
        <FilterButton
          ariaLabel="save chart"
          className="h-12  p-[2px] shadow-lg"
          rounding="rounded-full"
          onClick={onClickPreview}
          hasGradientIndicator={true}
          isActive={true}
        >
          <p className="p-4">Enter screenshot mode</p>
        </FilterButton>
      </div>
      {isOverlayVisible ? (
        <ScreenshotMode
          borderColor={borderColor}
          borderSize={borderSize}
          chart={chart}
          columns={-2}
          previewIndex={previewIndex}
          list={list}
          onExit={onExit}
          rows={-2}
        />
      ) : null}
    </div>
  );
};
