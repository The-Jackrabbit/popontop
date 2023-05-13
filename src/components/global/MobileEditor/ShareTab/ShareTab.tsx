import { HomeIcon, ShareIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../types/Albums';
import {
  resetThemeColorMetaTag,
  setThemeColorMetaTag,
} from '../../../../utils/mobile-theme';
import { ICON_STYLE } from '../../../lib/FilterButton/FilterButton';
import { PreviewEditor } from './PreviewEditor/PreviewEditor';

export interface Props {
  borderColor: string;
  borderSize: number;
  chart: ChartHookNode;
  chartTitle: string;
  list: Album[];
  titleBackgroundColor: string;
}

export const ShareTab: React.FC<Props> = ({
  borderColor,
  borderSize,
  chart,
  list,
}) => {
  const [isMainOverlayVisible, setIsMainOverlayVisible] = useState(false);

  const onClick = (event: React.BaseSyntheticEvent) => {
    event.stopPropagation();
    resetThemeColorMetaTag();

    if (!isMainOverlayVisible) resetThemeColorMetaTag();
    else {
      setThemeColorMetaTag(chart.settings.state.backgroundColor);
    }
    setIsMainOverlayVisible(!isMainOverlayVisible);
  };

  return (
    <div className="fixed top-0 left-0 z-20 h-full">
      <div className="fixed bottom-[20vh] right-0 flex w-min justify-end">
        <p
          className="
            rounded-tl-lg rounded-bl-lg
            bg-white
            px-2 py-1 text-xs
            leading-tight shadow-lg dark:bg-black
          "
          onClick={onClick}
          style={{
            textOrientation: 'upright',
            writingMode: 'vertical-rl',
            border: !isMainOverlayVisible ? 'none' : '2px solid white',
          }}
        >
          {!isMainOverlayVisible ? (
            <ShareIcon className={ICON_STYLE} />
          ) : (
            <HomeIcon className={ICON_STYLE} />
          )}
        </p>
      </div>
      {isMainOverlayVisible ? (
        <PreviewEditor
          borderColor={borderColor}
          borderSize={borderSize}
          chart={chart}
          list={list}
        />
      ) : null}
    </div>
  );
};

export default ShareTab;
