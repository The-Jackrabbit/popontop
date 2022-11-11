import SwitchExpandingPill from "../../../../lib/ExpandingPill/SwitchExpandingPill/SwitchExpandingPill";
import TextExpandingPill from "../../../../lib/ExpandingPill/TextExpandingPill/TextExpandingPill";


export interface Props {
  showTitle: boolean;
  setShowTitle: (value: boolean) => void;
  listAlbums: boolean;
  setListAlbums: (value: boolean) => void;
  borderColor: string;
  setBorderColor: (value: string) => void;
  borderSize: number;
  setBorderSize: (value: number) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  textColor: string;
  setTextColor: (value: string) => void;
}

const PageTwo: React.FC<Props> = ({
  showTitle,
  setShowTitle,
  listAlbums,
  setListAlbums,
  borderColor,
  backgroundColor,
  textColor,
  setBorderColor,
  setBackgroundColor,
  setTextColor,
}) => {
  return (
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

      <TextExpandingPill
        className="inline-block"
        label="border color"
        setValue={(value: string) => setBorderColor(value)}
        value={borderColor}
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
};

export default PageTwo;