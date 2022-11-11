import { useState } from "react";
import LoadingBouncer from "../../../../../lib/LoadingBouncer/LoadingBouncer";
import Link from 'next/link';
import ClickCircleButton from "./ClickCircleButton/ClickCircleButton";
import { signIn, signOut, useSession } from "next-auth/react";
export interface Props {
  isLoading: boolean;
  saveChart: () => Promise<string>;
}

export const ClickCircle: React.FC<Props> = ({
  isLoading,
  saveChart,
}) => {
  const { data: sessionData } = useSession();
  const [savedChartId, setSavedChartId] = useState<null | string>('null');
  const save = async () => {
    const uuid = await saveChart();
    setSavedChartId(uuid);
  };
  const onClickLogin = () => {
    sessionData ?  signOut() : signIn('google')
  };

  return (
    <div
      className="
        bg-[rgba(255,255,255,0.14)] shadow-lg
        z-50 absolute
        top-1/2
        rounded-full h-64 w-64

        flex flex-wrap
      "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      <button id="top" className="basis-1/3 h-1/3 rounded-full"></button>
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      <ClickCircleButton
        icon="💾"
        isLoading={isLoading}
        label="save chart"
        onClick={(e) => {
          e.stopPropagation();
          save();
        }}
      />
      <div
        className="
        bg-neutral-300 basis-1/3 h-1/3 rounded-full     
          flex-col text-center flex justify-center
        "
      >
        {savedChartId !== 'null' ? 
          <Link href={`/mobile/charts/${savedChartId}`}>
            <a>
              <p className="animate-pulse">➡️</p>
              <p className="text-neutral-600 text-xs ">view chart</p>
            </a>
          </Link>
          : null
        }
      </div>
      <ClickCircleButton
        icon="📷"
        isLoading={false}
        label="download as png"
        onClick={() => undefined}
      />
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      <ClickCircleButton
        icon={!sessionData ? "🪵" : "👋"}
        isLoading={false}
        label={!sessionData ? "log in" : "sign out"}
        onClick={onClickLogin}
      />
      <div className="basis-1/3 h-1/3 rounded-full"></div>
    </div>
  );
};

export default ClickCircle;
