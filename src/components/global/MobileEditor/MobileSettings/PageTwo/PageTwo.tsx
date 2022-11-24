import SwitchExpandingPill from "../../../../lib/ExpandingPill/SwitchExpandingPill/SwitchExpandingPill";
import TextExpandingPill from "../../../../lib/ExpandingPill/TextExpandingPill/TextExpandingPill";

export interface Props {
  backgroundColor: string;
  borderSize: number;
  listAlbums: boolean;
  setBackgroundColor: (value: string) => void;
  setBorderSize: (value: number) => void;
  setListAlbums: (value: boolean) => void;
  setShowTitle: (value: boolean) => void;
  setTextColor: (value: string) => void;
  showTitle: boolean;
  textColor: string;
}

const PageTwo: React.FC<Props> = ({
  showTitle,
  listAlbums,
  backgroundColor,
  setBackgroundColor,
  setListAlbums,
  setShowTitle,
  setTextColor,
  textColor,
}) => (
  <div className="p-4 flex flex-wrap gap-2">
    <TextExpandingPill
      className="inline-block"
      label="text color"
      setValue={(value: string) => setTextColor(value)}
      value={textColor}
    />

    <TextExpandingPill
      className="inline-block"
      label="background color"
      setValue={(value: string) => setBackgroundColor(value)}
      value={backgroundColor}
    />

    <SwitchExpandingPill
      className="w-[140px] inline-block"
      label="show title?"
      value={showTitle}
      setValue={(value) => setShowTitle(Boolean(value))}
    />

    <SwitchExpandingPill
      className="w-[160px] inline-block"
      label="list albums?"
      value={listAlbums}
      setValue={(value) => setListAlbums(Boolean(value))}
    />
  </div>
);

export default PageTwo;