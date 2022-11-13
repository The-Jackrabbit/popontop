import { useState } from "react";
import LoadingBouncer from "../../../../../lib/LoadingBouncer/LoadingBouncer";
import Link from 'next/link';
import ClickCircleButton from "./ClickCircleButton/ClickCircleButton";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  ArrowDownCircleIcon,
  ArrowRightOnRectangleIcon,
  CloudArrowUpIcon,
  ListBulletIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid';

export interface Props {
  isLoading: boolean;
  saveChart: () => Promise<string>;
}

export const ClickCircle: React.FC<Props> = ({
  isLoading,
  saveChart,
}) => {
  const { data: sessionData } = useSession();
  const r = useRouter();

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
        bg-[rgba(255,255,255,0.5)]
        dark:bg-[rgba(0,0,0,0.5)] shadow-lg
        z-50
        rounded-full h-64 w-64
        flex flex-wrap
      "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      <div
        id="top"
        className="
          items-center align-middle content-center
          basis-1/3 h-1/3
          rounded-full
        "
      >
        <div className="flex justify-center">
        {sessionData && r.pathname === '/mobile' ? (
          <ClickCircleButton
            icon={
              <ListBulletIcon
                className="
                  h-6 w-6 text-center align-center content-center flex justify-center
                "
              />
            }
            isLoading={false}
            label="your charts"
            onClick={(e) => {
              e.stopPropagation();
              r.push('/mobile/your-charts')
            }}
            />
            ) : null}
         {sessionData && r.pathname === '/mobile/your-charts' ? (
           <ClickCircleButton
            icon="✍️"
            isLoading={false}
            label="create chart"
            onClick={(e) => {
              e.stopPropagation();
              r.push('/mobile')
            }}
            />
            ) : null}
        </div>
      </div>
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      <ClickCircleButton
        icon={
          <CloudArrowUpIcon
            className="
              h-6 w-6 text-center align-center content-center justify-center
              flex
              text-neutral-900 dark:text-neutral-50
            "
          />
        }
        isLoading={isLoading}
        label="save chart"
        onClick={(e) => {
          e.stopPropagation();
          save();
        }}
      />
      <div
        className="
        bg-neutral-300 dark:bg-neutral-900 basis-1/3 h-1/3 rounded-full     
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
        icon={
          <ArrowDownCircleIcon
            className="
              h-6 w-6 text-center align-center content-center justify-center
              flex
              text-neutral-900 dark:text-neutral-50
            "
          />
        }
        isLoading={false}
        label="download"
        onClick={() => undefined}
      />
      <div className="basis-1/3 h-1/3 rounded-full"></div>
      <ClickCircleButton
        icon={!sessionData
          ? (
            <UserCircleIcon
              className="
                h-6 w-6 text-center align-center content-center justify-center
                flex
                text-neutral-900 dark:text-neutral-50
              "
            />
          )
          : (
            <ArrowRightOnRectangleIcon
              className="
                h-6 w-6 text-center align-center content-center justify-center
                flex
                text-neutral-900 dark:text-neutral-50
              "
            />
          )
        }
        isLoading={false}
        label={!sessionData ? "log in" : "sign out"}
        onClick={onClickLogin}
      />
      <div className="basis-1/3 h-1/3 rounded-full"></div>
    </div>
  );
};

export default ClickCircle;
