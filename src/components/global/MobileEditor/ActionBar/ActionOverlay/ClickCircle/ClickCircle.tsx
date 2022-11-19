import { useEffect, useState } from "react";
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
import html2canvas from 'html2canvas';
import { PaintBrushIcon } from "@heroicons/react/20/solid";
import ClickCircleLayout from "./ClickCircleTwo";
export interface Props {
  isLoading: boolean;
  saveChart: () => Promise<string>;
}

export const CLICK_CIRCLE_STYLE = `
  h-6 w-6
  flex text-center align-center content-center justify-center
  text-neutral-400 dark:text-neutral-50
`;

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

  const onClickDownload = () => {
    // setIsPreviewOverlayVisible(true);
  }
  
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
      leftButton={
        <ClickCircleButton
          icon={null}
          isLoading={false}
          label=""
          onClick={() => undefined}
        />
      }
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
          {sessionData && r.pathname === '/mobile/your-charts' ? (
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

/* {isPreviewOverlayVisible && (
  const [isPreviewOverlayVisible, setIsPreviewOverlayVisible] = useState(false);
  
  <div
  className="bg-transparent fixed top-0 left-0 bottom-0 right-0 h-screen w-screen -translate-x-4 z-50"
  id="preview"
  >
  <button
  onClick={(e) => { 
    e.stopPropagation();
            setIsPreviewOverlayVisible(false)
          }}
          >
          isPreviewOverlayVisible</button>
          </div>
          )} */
          //     html2canvas(document.getElementById('editor'), {
            // // 
            //       // windowHeight: 800*1,
            //       windowWidth: 414/2,
            //       // height: 800*1,
          //       width: 414*2,
          //       scale: 1
          //     }).then((canvas) => {
          //       document?.getElementById('preview')?.appendChild(canvas);
          //     });