import React, { useEffect, useState } from "react";
import { Album } from "../../../../styles/types/Albums";
import Button from "../../../lib/Button/Button";
import Grid from "../../../lib/Grid/Grid";
import NumberInput from "../../../lib/NumberInput/NumberInput";
import Title from "../Title/Title";

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
  const listColumns = 1;
  const aa = (columns*rows)/listColumns 
  const firstColumn = list.filter((_, index) => index < aa);
  const secondColumn = list.filter((_, index) => index >= aa && index < 2*aa);
  const thirdColumn = list.filter((_, index) => index >= 2*aa && index < 3*aa);
  const onClickPreview = () => {
    setIsOverlayVisible(true);
    const t = document.getElementById('test-dark-meta');
    t?.setAttribute('content', 'rgba(0,0,0,0.98)');
  }
  useEffect(() => {
    const t = document.getElementById('test-dark-meta');
    return () => t?.setAttribute('content', '#171717');
  }, [])
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const onClick = (event: React.BaseSyntheticEvent) => {
    event.stopPropagation();
    setIsMainOverlayVisible(!isMainOverlayVisible);
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
        bg-white dark:bg-black text-xs
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
  {isMainOverlayVisible ? (

    <div
    className="
      
        dark:text-white
        bg-black
        h-screen
        flex flex-col
      "
    >
      <div className="basis-[3%] z-30">
        <NumberInput
          className="flex w-full justify-between mb-4"
          currentValue={rows}
          label="number of rows"
          onDecrement={onDecrementRows}
          onIncrement={onIncrementRows}
        />
      </div>
      <div className="basis-[3%]">
        <NumberInput
          className="flex w-full justify-between mb-4"
          currentValue={columns}
          label="number of columns"
          onDecrement={onDecrementColumns}
          onIncrement={onIncrementColumns}
        />
      </div>
      <Button className="basis-[4%] mb-4" onClick={onClickPreview}>
        Preview
      </Button>
      <Grid
        list={list}
        columns={columns}
        rows={rows}
      />
      {isOverlayVisible ? (
        <div className="fixed top-0 left-0 z-50">
          <div
            className="
              fixed right-0
            "
          >
            <div
              className="
                bg-[rgba(0,0,0,0.98)]
                h-screen w-screen
                p-1 z-50
              "
              onClick={() => setIsOverlayVisible(false)}
            >
              <div className="h-full w-full flex flex-col">
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
                <div className="flex flex-row basis-[30%]">

                <ol className="basis-1/3" style={{ listStyle: 'inside', listStyleType: 'inherit'}}>
                  {firstColumn.map((album, index) => 
                    <li className="text-[8px]" key={JSON.stringify(album)}>
                      {album.name}
                    </li>
                  )}
                </ol>
                <ol className="basis-1/3" style={{ listStyle: 'inside', listStyleType: 'inherit'}}>
                  {secondColumn.map((album, index) => 
                    <li className="text-[8px]" key={JSON.stringify(album)}>
                      {album.name}
                    </li>
                  )}
                </ol>
                  <ol className="basis-1/3" style={{ listStyle: 'inside', listStyleType: 'inherit'}}>
                  {thirdColumn.map((album, index) => 
                    <li className="text-[8px]" key={JSON.stringify(album)}>
                      {album.name}
                    </li>
                  )}
                </ol>
                </div>
              </div> 
            </div>
          </div>
        </div>
      ) : null}
    </div>
    ): null}
    </div>
  )
};

export default ShareTab;
