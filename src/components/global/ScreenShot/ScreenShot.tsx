import { ChartHookNode } from '../../../frontend/hooks/use-chart/use-chart';
import { Album } from '../../../types/Albums';
import Title from '../../lib/Title/Title';

export interface Props {
  chart: ChartHookNode;
}
const AlbumOverlay = ({
  album,
  textColor,
}: {
  album: Album;
  textColor: string;
}) => (
  <div
    className="box-content flex aspect-square basis-1/2 items-center justify-center bg-opacity-10 bg-cover bg-center"
    style={{ backgroundImage: `url(${album.imageUrl})` }}
  >
    <p
      style={{ color: textColor }}
      className="flex h-full w-full items-center self-center bg-opacity-75 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(255,255,255,0.05)] p-4 text-center align-middle text-sm"
    >{`${album.artist} - ${album.name}`}</p>
  </div>
);

const ScreenShot = ({ chart }: Props) => {
  return (
    <div
      style={{
        backgroundColor: chart.childrenNodes.settings.state.backgroundColor,
      }}
      className="flex h-screen justify-center"
    >
      <div className="h-screen origin-top scale-90 p-4">
        {chart.childrenNodes.settings.state.showTitle ? (
          <div className="pb-4">
            <Title
              backgroundColor={
                chart.childrenNodes.settings.state.titleBackgroundColor
              }
              textColor={chart.childrenNodes.settings.state.textColor}
              isReadOnly={true}
              chartTitle={chart.state.chartTitle ?? ''}
              setValue={(value: string) => chart.actions.setChartTitle(value)}
              showIntroduction={false}
            />
          </div>
        ) : null}
        <div className="flex w-full bg-red-300">
          <AlbumOverlay
            album={chart.childrenNodes.list.state[0] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.childrenNodes.list.state[1] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
        </div>
        <div className="flex w-full bg-green-300">
          <AlbumOverlay
            album={chart.childrenNodes.list.state[2] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.childrenNodes.list.state[3] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
        </div>
        <div className="flex w-full bg-blue-300">
          <AlbumOverlay
            album={chart.childrenNodes.list.state[4] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.childrenNodes.list.state[5] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.childrenNodes.list.state[6] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
        </div>
        <div className="flex w-full bg-amber-300">
          <AlbumOverlay
            album={chart.childrenNodes.list.state[7] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.childrenNodes.list.state[8] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
          <AlbumOverlay
            album={chart.childrenNodes.list.state[9] as Album}
            textColor={chart.childrenNodes.settings.state.textColor}
          />
        </div>
        {/* <List
        backgroundColor={
          chart.childrenNodes.settings.state.backgroundColor
        }
        list={chart.childrenNodes.list.state}
        listMode={ListRowMode.NORMAL}
        onRearrangeClick={() => undefined}
        removeAlbumAtIndex={
          chart.childrenNodes.list.actions.removeAlbumAtIndex
        }
        showAlbums={chart.childrenNodes.settings.state.showAlbums}
        textColor={chart.childrenNodes.settings.state.textColor}
      /> */}
      </div>
    </div>
  );
};

export default ScreenShot;
