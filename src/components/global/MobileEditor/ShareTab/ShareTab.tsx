import React, { useEffect, useState } from "react";
import { Album } from "../../../../styles/types/Albums";
import { PreviewEditor } from "./PreviewEditor/PreviewEditor";

export interface Props {
  chartTitle: string;
  columns: number;
  list: Album[];
  onDecrementColumns: () => void;
  onIncrementColumns: () => void;
  onDecrementRows: () => void;
  onIncrementRows: () => void;
  rows: number;
}

export const ShareTab: React.FC<Props> = ({
  chartTitle,
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
  }, [])
  const onClick = (event: React.BaseSyntheticEvent) => {
    event.stopPropagation();
    setIsMainOverlayVisible(!isMainOverlayVisible);
  };

  return (
    <div className="fixed top-0 left-0">
      <div className="fixed bottom-[20vh] flex justify-end w-screen">
        <p
          className="
            px-2 py-1
            leading-tight
            rounded-tl-lg rounded-bl-lg shadow-lg
            bg-white dark:bg-black text-xs
          "
          onClick={onClick}
          style={{ 
            textOrientation: 'upright',
            writingMode: 'vertical-rl',
            border: !isMainOverlayVisible ? 'none' : '2px solid white'
          }}
        >
          {!isMainOverlayVisible ? 'share' : 'back to editor' }
        </p>
      </div>
      {isMainOverlayVisible ? (
        <PreviewEditor 
          chartTitle={chartTitle}
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
