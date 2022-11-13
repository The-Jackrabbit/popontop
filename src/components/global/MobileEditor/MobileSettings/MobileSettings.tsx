import { Settings } from "../../../../frontend/hooks/use-chart/use-chart-settings";
import PageTwo from "./PageTwo/PageTwo";

export interface Props {
  isSaveLoading: boolean;
  onSave: () => Promise<string>;
  settings: Settings;
}


export const MobileSettings: React.FC<Props> = ({ 
  settings: {
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
    showAlbums,
    setShowAlbums,
  }
}) => {
  return (
    <div className="h-full">
      {/* <HorizontalSwipe> */}
        <div className="flex flex-col">
          <PageTwo
            key="page-two"
            showTitle={showTitle}
            setShowTitle={setShowTitle}
            listAlbums={showAlbums}
            setListAlbums={setShowAlbums}
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