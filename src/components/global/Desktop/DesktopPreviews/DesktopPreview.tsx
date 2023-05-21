import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { AlbumOverlay } from '../../MobileEditor/ScreenShot/ScreenShot';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';
import NumericExpandingPill from '../../../lib/ExpandingPill/NumericExpandingPill/NumericExpandingPill';
import { Dispatch, SetStateAction } from 'react';

export interface Props {
  chart: ChartHookNode;
  previewIndex: number;
  setPreviewIndex: Dispatch<SetStateAction<number>>;
}

const transformRows = (rows: number[][]): number[][] => {
  const trows: number[][] = [];
  let currentLength = 0;
  rows.forEach((row) => {
    const transformedRow = row.map((n) => n + currentLength);
    trows.push(transformedRow);
    currentLength += transformedRow.length;
  });

  console.log({ currentLength });

  return trows;
};

export const DesktopPreview = ({
  chart,
  previewIndex,
  setPreviewIndex,
}: Props) => {
  // const rows = [
  //   [0, 1, 2, 3, 4],
  //   [5, 6, 7, 8, 9],
  // ];
  const templates = {
    classics: [
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
      [],
      [0, 1, 2, 3, 4, 5, 6, 7, 8],
      [0, 1, 2, 3, 4, 5, 6, 7, 8],
      [],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    r50: [
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
    ],
    r100: [
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
    ],
    top50: [
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [],
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
      [],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5, 6, 7],
    ],
    honeycomb10: [
      [0, 1],
      [0, 1, 2],
      [0, 1, 2],
      [0, 1],
    ],
  };
  const values = Object.values(templates);
  const template = values.at(previewIndex) as number[][];
  const rows = transformRows(template);

  return (
    <div className="flex h-full flex-col justify-between py-8 px-24">
      <div className="overflow-y-hidden">
        {rows.map((row, rowIndex) => (
          <>
            {row.length === 0 ? (
              <div className="m-4" key={`row-${rowIndex}-empty`}></div>
            ) : (
              <div className="flex w-full bg-blue-300" key={`row-${rowIndex}`}>
                {row.map((albumIndex) => (
                  <AlbumOverlay
                    album={chart.list.state.at(albumIndex) ?? EMPTY_ALBUM}
                    count={row.length}
                    key={`album-${albumIndex}`}
                    textColor={chart.settings.state.textColor}
                  />
                ))}
              </div>
            )}
          </>
        ))}
      </div>
      <div className="mt-4 h-min shrink basis-9">
        <NumericExpandingPill
          isInitiallyExpanded={true}
          label="Template"
          max={values.length - 1}
          min={0}
          setValue={setPreviewIndex}
          value={previewIndex}
        />
      </div>
    </div>
  );
};
