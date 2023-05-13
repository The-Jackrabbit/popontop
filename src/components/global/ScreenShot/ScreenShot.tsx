import { EMPTY_ALBUM } from '../../../constants/empty-album';
import { ChartHookNode } from '../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../types/Albums';
import Title from '../../lib/Title/Title';

export interface Props {
  chart: ChartHookNode;
}
const AlbumOverlay = ({
  album,
  count,
  textColor,
}: {
  album: Album;
  count: number;
  textColor: string;
}) => {
  const albumDescription =
    album.artist !== '' || album.name !== ''
      ? `${album.artist} - ${album.name}`
      : 'No album';
  return (
    <div
      className={`box-content flex aspect-square w-1/${count} basis-1/${count} items-center justify-center bg-opacity-10 bg-cover bg-center`}
      style={{ backgroundImage: `url(${album.imageUrl})` }}
    >
      <p
        style={{ color: textColor }}
        className="flex h-full w-full items-center  self-center bg-opacity-75 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(255,255,255,0.05)] p-4 text-center align-middle text-sm"
      >
        {albumDescription}
      </p>
    </div>
  );
};
const ScreenShot = ({ chart }: Props) => {
  return (
    <div
      style={{
        backgroundColor: chart.settings.state.backgroundColor,
      }}
      className="flex h-screen w-screen justify-center self-center pt-4 align-middle"
    >
      <div className=" h-screen w-screen origin-top scale-[89%] p-6">
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
        <div className="flex w-full bg-red-300">
          <AlbumOverlay
            album={chart.list.state.at(0) ?? EMPTY_ALBUM}
            count={2}
            textColor={chart.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.list.state.at(1) ?? EMPTY_ALBUM}
            count={2}
            textColor={chart.settings.state.textColor}
          />
        </div>
        <div className="flex w-full bg-green-300">
          <AlbumOverlay
            album={chart.list.state.at(2) ?? EMPTY_ALBUM}
            count={2}
            textColor={chart.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.list.state.at(3) ?? EMPTY_ALBUM}
            count={2}
            textColor={chart.settings.state.textColor}
          />
        </div>
        <div className="flex w-full bg-blue-300">
          <AlbumOverlay
            album={chart.list.state.at(4) ?? EMPTY_ALBUM}
            count={3}
            textColor={chart.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.list.state.at(5) ?? EMPTY_ALBUM}
            count={3}
            textColor={chart.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.list.state.at(6) ?? EMPTY_ALBUM}
            count={3}
            textColor={chart.settings.state.textColor}
          />
        </div>
        <div className="flex w-full bg-amber-300">
          <AlbumOverlay
            album={chart.list.state.at(7) ?? EMPTY_ALBUM}
            count={3}
            textColor={chart.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.list.state.at(8) ?? EMPTY_ALBUM}
            count={3}
            textColor={chart.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.list.state.at(9) ?? EMPTY_ALBUM}
            count={3}
            textColor={chart.settings.state.textColor}
          />
        </div>
      </div>
    </div>
  );
};

export default ScreenShot;
