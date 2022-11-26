import React, { useState } from "react";
import { Album } from "../../../../styles/types/Albums";
import Grid from "../../../lib/Grid/Grid";
import Title from "../Title/Title";

export interface Props {
  list: Album[];
  columns: number;
  rows: number; 
  chartTitle: string;
}

export const ShareTab: React.FC<Props> = ({
  list,
  columns,
  rows,
  chartTitle,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(!false);
  const onClick = (event: React.BaseSyntheticEvent) => {
    event.stopPropagation();
    setIsOverlayVisible(true);
  };

  return (
    <div className="fixed top-0 left-0">
      <div
        className="
          fixed bottom-[20vh] right-0
        "
      >
        <p
          className="
            px-2 py-1
            leading-tight
            rounded-tl-lg rounded-bl-lg shadow-lg
            bg-white text-xs
          "
          onClick={onClick}
          style={{ 
            textOrientation: 'upright',
            writingMode: 'vertical-rl',
            visibility: !isOverlayVisible ? 'visible' : 'hidden'
          }}
        >
          share
        </p>
      </div>
      {isOverlayVisible ? (
        <div
          className="
            bg-[rgba(0,0,0,0.8)]
            h-screen w-screen
            p-1
          "
          onClick={() => setIsOverlayVisible(false)}
        >
          <div className="h-full w-full">
            <Title
              chartTitle={chartTitle}
              isReadOnly={true}
              setValue={() => undefined}
              showIntroduction={false}
              textColor="white"
            /> 
            <Grid
              columns={columns}
              rows={rows}
              list={list}
            />
          </div> 
        </div>
      ) : null}
    </div>
  )
};

export default ShareTab;
