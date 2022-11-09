import { useState } from "react";
import LoadingBouncer from "../../../../../lib/LoadingBouncer/LoadingBouncer";
import Link from 'next/link';

export interface Props {
  isLoading: boolean;
  saveChart: () => Promise<string>;
}

export const ClickCircle: React.FC<Props> = ({
  isLoading,
  saveChart,
}) => {
  const [savedChartId, setSavedChartId] = useState<null | string>('null');
  const save = async () => {
    const uuid = await saveChart();
    setSavedChartId(uuid);
  }
  return (
    <div
      className="
        bg-[rgba(255,255,255,0.14)] shadow-lg
        z-50 absolute
        top-1/2
        rounded-full h-64 w-64

        flex flex-wrap
      "
    >
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      <button
        id="top"
        className="
          basis-1/3 h-1/3 rounded-full
          
        "
      >
      </button>
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      <button
        id="top"
        className="
          basis-1/3 h-1/3 rounded-full
          text-xs
        "
        onClick={(e) => {
          e.stopPropagation();
          save();
       }}  
      >{isLoading
        ?  <LoadingBouncer />
      :
      <>
        <p className="text-4xl">💾</p>
        <p
          className="text-neutral-100 "
          
        >
          save
       </p>
      </>
      }
       </button>
       <div className="
       bg-neutral-300 basis-1/3 h-1/3 rounded-full     
        flex-col text-center flex justify-center
       ">
        {savedChartId !== 'null' ? 
          <Link href={`/mobile/charts/${savedChartId}`}>
          <>
          <p className="animate-pulse ">➡️</p>
          <p className="text-neutral-600  text-xs ">view chart</p>
          </>
          </Link>
          
          : null
        }
      </div>
      <button 
        id="left"
        className="
          basis-1/3 h-1/3 rounded-full
          text-xs
        "
      >
        <p className="text-4xl"> 📷</p>
        <p className="text-neutral-100 ">download as png</p>
      </button>
      
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      <button
        id="bottom"
        className="
          basis-1/3 h-1/3 rounded-full
          text-4xl
        "
      >
      </button>
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      

    </div>
  );
};

export default ClickCircle;
