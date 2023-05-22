import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { AlbumOverlay } from '../../MobileEditor/ScreenShot/ScreenShot';
import { EMPTY_ALBUM } from '../../../../constants/empty-album';
import { NumericExpandingPillContent } from '../../../lib/ExpandingPill/NumericExpandingPill/NumericExpandingPill';
import { Dispatch, SetStateAction } from 'react';

export interface Props {
  chart: ChartHookNode;
  previewIndex: number;
  setPreviewIndex?: Dispatch<SetStateAction<number>>;
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

export const CHART_TEMPLATES = {
  honeycomb10: [
    [0, 1],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1],
  ],
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
};
export const DesktopPreview = ({
  chart,
  previewIndex,
  setPreviewIndex,
}: Props) => {
  const values = Object.values(CHART_TEMPLATES);
  const template = values.at(previewIndex) as number[][];
  const rows = transformRows(template);

  return (
    <div className="flex h-min flex-col justify-between ">
      <div className={`${setPreviewIndex ? 'max-h-96' : ''} overflow-y-hidden`}>
        {rows.map((row, rowIndex) => (
          <>
            {row.length === 0 ? (
              <div className="m-4" key={`row-${rowIndex}-empty`} />
            ) : (
              <div className="flex w-full bg-blue-300" key={`row-${rowIndex}`}>
                {row.map((albumIndex) => (
                  <AlbumOverlay
                    album={chart.list.state.at(albumIndex) ?? EMPTY_ALBUM}
                    albumOverlayColor={
                      chart.settings.state.albumOverlayColor === ''
                        ? undefined
                        : chart.settings.state.albumOverlayColor
                    }
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
      {setPreviewIndex ? (
        <div className="mt-4 h-min shrink basis-9">
          <NumericExpandingPillContent
            max={values.length - 1}
            min={0}
            setValue={setPreviewIndex}
            textColor={chart.settings.state.textColor}
            value={previewIndex}
          />
        </div>
      ) : null}
    </div>
  );
};
