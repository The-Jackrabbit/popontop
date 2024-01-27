import isMobile from 'is-mobile';
import { ChartHookNode } from '../../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../../types/Albums';
import Title from '../../../lib/Title/Title';
import { DesktopPreview } from '../../Desktop/DesktopPreview/DesktopPreview';

export interface Props {
  chart: ChartHookNode;
  previewIndex: number;
}

export const AlbumOverlay = ({
  album,
  albumOverlayColor = 'rgba(0,0,0,0.8)',
  count,
  isMobile,
  textColor,
}: {
  album: Album;
  albumOverlayColor?: string;
  count: number;
  isMobile: boolean;
  textColor: string | null;
}) => {
  const albumDescription =
    album.artist !== '' || album.name !== ''
      ? `${album.artist} - ${album.name}`
      : 'No album';
  return (
    <div
      className={`box-content flex aspect-square w-1/${count} basis-1/${count} items-center justify-center bg-opacity-10 bg-cover bg-center`}
      style={{
        width: `${(1 / count) * 100}%`,
        backgroundImage: `url(${album.imageUrl})`,
      }}
    >
      {isMobile ? (
        <p
          style={
            textColor
              ? {
                  color: textColor,
                }
              : {}
          }
          className={`flex h-full w-full items-center justify-center self-center overflow-hidden bg-opacity-75 bg-gradient-to-t from-[${albumOverlayColor}] to-[rgba(255,255,255,0.05)] text-center align-middle text-xs`}
        >
          {albumDescription}
        </p>
      ) : null}
    </div>
  );
};
const ScreenShot = ({ chart, previewIndex }: Props) => {
  const size = isMobile() ? 'h-screen w-screen' : '';

  return (
    <div
      style={
        chart.settings.state.backgroundColor
          ? {
              backgroundColor: chart.settings.state.backgroundColor,
            }
          : {}
      }
      className={`flex ${size} justify-center self-center  align-middle`}
    >
      <div className={`${size} origin-top  p-4`}>
        {chart.settings.state.showTitle ? (
          <div className="pb-4">
            <Title
              backgroundColor={chart.settings.state.titleBackgroundColor}
              textColor={chart.settings.state.textColor}
              isReadOnly={true}
              chartTitle={chart.state.chartTitle ?? ''}
              setValue={(value: string) => chart.actions.setChartTitle(value)}
              showIntroduction={false}
            />
          </div>
        ) : null}
        <DesktopPreview isMobile={true} chart={chart} previewIndex={0} />
      </div>
    </div>
  );
};

export default ScreenShot;
