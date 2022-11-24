import { useState } from "react";
import Link from 'next/link';
import ClickCircleButton from "./ClickCircleButton/ClickCircleButton";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  ArrowRightOnRectangleIcon,
  CloudArrowUpIcon,
  ListBulletIcon,
  PaintBrushIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid';
import ClickCircleLayout from "./ClickCircleLayout";

export interface Props {
  editChart: () => Promise<string>;
  isLoading: boolean;
  saveChart: () => Promise<string>;
}

export const CLICK_CIRCLE_STYLE = `
  h-6 w-6
  flex text-center align-center content-center justify-center
  text-neutral-400 dark:text-neutral-50
`;

export const ClickCircle: React.FC<Props> = ({
  editChart,
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
    <ClickCircleLayout
      bottomButton={
        <ClickCircleButton
          icon={!sessionData ? (
              <UserCircleIcon className={CLICK_CIRCLE_STYLE} />
            ) : (
              <ArrowRightOnRectangleIcon className={CLICK_CIRCLE_STYLE} />
            )
          }
          isLoading={false}
          label={!sessionData ? "log in" : "sign out"}
          onClick={onClickLogin}
        />
      }
      centerButton={
        savedChartId !== 'null' ? (
          <Link href={`/mobile/charts/${savedChartId}`}>
            <a>
              <p className="animate-pulse">➡️</p>
              <p className="text-neutral-600 text-xs ">view chart</p>
            </a>
          </Link>
        ) : null
      }
      leftButton={r.pathname.includes('/mobile/charts/') ? (
          <ClickCircleButton
            icon={<PaintBrushIcon className={CLICK_CIRCLE_STYLE} />}
            isLoading={false}
            label="save changes"
            onClick={(e) => {
              e.stopPropagation();
              editChart();
            }}
          />
        ) : <ClickCircleButton
        icon={null}
        isLoading={false}
        label=""
        onClick={() => undefined}
      />}
      rightButton={
        <ClickCircleButton
          icon={<CloudArrowUpIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={isLoading}
          label="save chart"
          onClick={(e) => {
            e.stopPropagation();
            save();
          }}
        />
      }
      topButton={
        <div className="flex justify-center">
          {sessionData && r.pathname === '/mobile' ? (
            <ClickCircleButton
              icon={<ListBulletIcon className={CLICK_CIRCLE_STYLE} />}
              isLoading={false}
              label="your charts"
              onClick={(e) => {
                e.stopPropagation();
                r.push('/mobile/your-charts')
              }}
            />
          ) : null}
          {sessionData && r.pathname !== '/mobile' ? (
            <ClickCircleButton
              icon={<PaintBrushIcon className={CLICK_CIRCLE_STYLE} />}
              isLoading={false}
              label="create chart"
              onClick={(e) => {
                e.stopPropagation();
                r.push('/mobile')
              }}
            />
          ) : null}
        </div>
      }
    /> 
  );
};

export default ClickCircle;
