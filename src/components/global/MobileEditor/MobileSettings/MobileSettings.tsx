import HorizontalSwipe from "../../../lib/HorizontalSwipe/HorizontalSwipe";
import PageOne from "./PageOne/PageOne";
import PageThree from "./PageThree/PageThree";
import PageTwo from "./PageTwo/PageTwo";

export interface Props {
  isSaveLoading: boolean;
  onSave: () => Promise<string>;
}

export const MobileSettings: React.FC<Props> = ({ isSaveLoading, onSave }) => {
  return (
    <div className="p-3">
      <HorizontalSwipe>
        <div className="p-8"><PageOne onSave={onSave} isSaveLoading={isSaveLoading} /></div>
        <div className="p-8"><PageTwo /></div>
        <div className="p-8"><PageThree /></div>
      </HorizontalSwipe>
    </div>
  )
}



export default MobileSettings;