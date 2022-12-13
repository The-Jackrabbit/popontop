import { Album } from "../../../../../../styles/types/Albums";
import Grid from "../../../../../lib/Grid/Grid";
import { useResizer } from "../../../../../lib/Grid/Grid.stories";
import Title from "../../../../../lib/Title/Title";
import { TextList } from "./TextList/TextList";

export interface Props {
  chartTitle: string;
  columns: number;
  list: Album[];
  onExit: () => void;
  rows: number;
}

export const ScreenshotMode: React.FC<Props> = ({
  chartTitle,
  columns,
  list,
  onExit,
  rows,
}) => {
  const { containerRef, size } = useResizer();
  return (
    <div className="fixed top-0 left-0 z-50">
      <div className="fixed right-0">
        <div
          className="
          bg-[rgba(255,255,255,0.98)] dark:bg-[rgba(0,0,0,0.98)]
            h-[calc(100vh_-_30px)] w-screen
            p-1 z-50
          "
          onClick={() => onExit()}
        >
          <div
            {...containerRef}
            className="h-full w-full flex flex-col items-stretch"
          >
            <Title
              chartTitle={chartTitle}
              isReadOnly={true}
              setValue={() => undefined}
              showIntroduction={false}
              textColor="white"
            /> 
            {size ? (
              <Grid
                columns={columns}
                rows={rows}
                size={size}
                itemComponent={({ index, x, y }) =>  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={list[index]?.imageUrl ?? ''}
                    alt={list[index]?.artist ?? ''}
                    width={size.height}
                    height={size.width}
                  />
                }
              />
            ) : null}
            <div className="flex flex-row basis-[50%] shrink justify-center">
              <TextList list={list.filter((_, i) => i < columns*rows)} />         
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}