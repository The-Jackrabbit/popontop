import { HomeIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { colorMap } from '../../../../../constants/colors';
import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../../types/Albums';
import {
  resetThemeColorMetaTag,
  startScreenshotMode,
} from '../../../../../utils/mobile-theme';
import FilterButton from '../../../../lib/FilterButton/FilterButton';
import { Color } from '../../../DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import { ScreenshotMode } from './ScreenshotMode/ScreenshotMode';

export interface Props {
  borderColor: string;
  borderSize: number;
  chart: ChartHookNode;
  list: Album[];
}

export const PreviewEditor: React.FC<Props> = ({
  borderColor,
  borderSize,
  chart,
  list,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const onClickPreview = () => {
    setIsOverlayVisible(true);
    startScreenshotMode(chart.childrenNodes.settings.state.backgroundColor);
  };
  const onExit = () => {
    resetThemeColorMetaTag();
    setIsOverlayVisible(false);
  };

  return (
    <div
      className={`
        flex
        h-[calc(100vh_-_80px)] w-screen
        flex-col items-stretch
        justify-between
        p-12 align-middle
        dark:bg-neutral-900
      `}
    >
      <div>
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
        <p>
          Click the{' '}
          <HomeIcon
            className={
              'inline h-6 w-6 translate-y-[1px] text-neutral-900 dark:text-neutral-50'
            }
          />{' '}
          button to go back to the list editor
        </p>
      </div>
      <FilterButton
        ariaLabel="save chart"
        className="h-12  p-[2px] shadow-lg"
        rounding="rounded-full"
        onClick={onClickPreview}
        hasGradientIndicator={true}
        isActive={true}
      >
        Enter screenshot mode
      </FilterButton>
      {isOverlayVisible ? (
        <ScreenshotMode
          borderColor={borderColor}
          borderSize={borderSize}
          chart={chart}
          columns={-2}
          list={list}
          onExit={onExit}
          rows={-2}
        />
      ) : null}
    </div>
  );
};
