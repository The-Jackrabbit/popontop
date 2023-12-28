import { EMPTY_ALBUM } from '../../../../../constants/empty-album';
import { ChartHookNode } from '../../../../../frontend/hooks/use-chart/use-chart';
import { AlbumOverlay } from '../../../MobileEditor/ScreenShot/ScreenShot';

export interface Props {
  chart: ChartHookNode;
  isMobile: boolean;
  rows: number[][];
}

export const ChartTemplate = ({ chart, isMobile, rows }: Props) => {
  return (
    <>
      {rows.map((row, rowIndex) => (
        <>
          {row.length === 0 ? (
            <div className="m-4" key={`row-${rowIndex}-empty`} />
          ) : (
            <div className="flex  bg-blue-300" key={`row-${rowIndex}`}>
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
                  isMobile={isMobile}
                  textColor={chart.settings.state.textColor}
                />
              ))}
            </div>
          )}
        </>
      ))}
    </>
  );
};
