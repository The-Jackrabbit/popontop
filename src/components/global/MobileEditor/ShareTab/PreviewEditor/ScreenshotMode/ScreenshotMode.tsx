import { Album } from "../../../../../../styles/types/Albums";
import Grid from "../../../../../lib/Grid/Grid";
import Title from "../../../Title/Title";
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
  return (
    <div className="fixed top-0 left-0 z-50">
      <div className="fixed right-0">
        <div
          className="
            bg-[rgba(0,0,0,0.98)]
            h-screen w-screen
            p-1 z-50
          "
          onClick={() => onExit()}
        >
          <div className="h-full w-full flex flex-col items-stretch">
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
            <div className="flex flex-row basis-[50%] shrink justify-center">
              <TextList list={list.filter((_, i) => i < columns*rows)} />         
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}