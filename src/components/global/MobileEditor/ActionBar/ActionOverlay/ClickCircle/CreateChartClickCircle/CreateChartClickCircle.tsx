import { useState } from "react";
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  CloudArrowUpIcon,
  ListBulletIcon,
} from '@heroicons/react/24/solid';
import { EMPTY_CIRCLE_PROPS } from "../EditChartClickCircle/EditChartClickCircle";
import AccountCircleButton from "../ClickCircleButton/AccountCircleButton/AccountCircleButton";
import ClickCircleButton from "../ClickCircleButton/ClickCircleButton";
import ClickCircleLayout from "../ClickCircleLayout";

export interface Props {
  isLoading: boolean;
  saveChart: () => Promise<string>;
}

export const CLICK_CIRCLE_STYLE = `
  h-6 w-6
  flex text-center align-center content-center justify-center
  text-neutral-400 dark:text-neutral-50
`;

export const CreateChartClickCircle: React.FC<Props> = ({ isLoading, saveChart }) => {
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
  };
  
  return (
    <ClickCircleLayout
      bottomButton={<AccountCircleButton />}
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
      leftButton={<ClickCircleButton {...EMPTY_CIRCLE_PROPS} />}
      rightButton={
        <ClickCircleButton
          icon={<CloudArrowUpIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={isLoading}
          label="save chart"
          onClick={(e: any) => {
            e.stopPropagation();
            save();
          }}
        />
      }
      topButton={
        <ClickCircleButton
          icon={<ListBulletIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="your charts"
          onClick={(e: any) => {
            e.stopPropagation();
            r.push('/mobile/your-charts')
          }}
        />
      }
    /> 
  );
};

export default CreateChartClickCircle;

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