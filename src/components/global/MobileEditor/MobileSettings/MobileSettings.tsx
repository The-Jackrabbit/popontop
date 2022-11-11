import HorizontalSwipe from "../../../lib/HorizontalSwipe/HorizontalSwipe";
import PageThree from "./PageThree/PageThree";
import PageTwo from "./PageTwo/PageTwo";

export interface Props {
  isSaveLoading: boolean;
  onSave: () => Promise<string>;
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


export const MobileSettings: React.FC<Props> = ({ 
  isSaveLoading,
  onSave,
  borderColor,
  setBorderColor,
  borderSize,
  setBorderSize,
  backgroundColor,
  setBackgroundColor,
  textColor,
  setTextColor,
  showTitle,
  setShowTitle,
  listAlbums,
  setListAlbums,
}) => {
  return (
    <div className="h-full">
      {/* <HorizontalSwipe> */}
        <div className="flex flex-col">
          <PageTwo
            key="page-two"
            showTitle={showTitle}
            setShowTitle={setShowTitle}
            listAlbums={listAlbums}
            setListAlbums={setListAlbums}
            borderColor={borderColor}
            setBorderColor={setBorderColor}
            borderSize={borderSize}
            setBorderSize={setBorderSize}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            textColor={textColor}
            setTextColor={setTextColor}
          />
        </div>
      {/* </HorizontalSwipe> */}
    </div>
  )
}



export default MobileSettings;