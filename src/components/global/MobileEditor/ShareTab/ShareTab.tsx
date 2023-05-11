import { HomeIcon, ShareIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../types/Albums';
import { ICON_STYLE } from '../../../lib/FilterButton/FilterButton';
import { PreviewEditor } from './PreviewEditor/PreviewEditor';

export interface Props {
  borderColor: string;
  borderSize: number;
  chart: ChartHookNode;
  chartTitle: string;
  columns: number;
  list: Album[];
  onDecrementColumns: () => void;
  onIncrementColumns: () => void;
  onDecrementRows: () => void;
  onIncrementRows: () => void;
  rows: number;
  titleBackgroundColor: string;
}

export const ShareTab: React.FC<Props> = ({
  borderColor,
  borderSize,
  chart,
  columns,
  list,
  onDecrementColumns,
  onIncrementColumns,
  onDecrementRows,
  onIncrementRows,
  rows,
}) => {
  const [isMainOverlayVisible, setIsMainOverlayVisible] = useState(false);
  useEffect(() => {
    const t = document.getElementById('test-dark-meta');
    return () => t?.setAttribute('content', '#171717');
  }, []);
  const onClick = (event: React.BaseSyntheticEvent) => {
    event.stopPropagation();
    setIsMainOverlayVisible(!isMainOverlayVisible);
  };

  return (
    <div className="fixed top-0 left-0 z-20">
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
          columns={columns}
          list={list}
          onDecrementColumns={onDecrementColumns}
          onIncrementColumns={onIncrementColumns}
          onDecrementRows={onDecrementRows}
          onIncrementRows={onIncrementRows}
          rows={rows}
        />
      ) : null}
    </div>
  );
};

export default ShareTab;
