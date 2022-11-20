import { useState } from "react";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  CloudArrowUpIcon,
  ListBulletIcon,
} from '@heroicons/react/24/solid';
import AccountCircleButton from "../ClickCircleButton/AccountCircleButton/AccountCircleButton";
import ClickCircleButton, { CLICK_CIRCLE_STYLE, EMPTY_CIRCLE_PROPS } from "../ClickCircleButton/ClickCircleButton";
import ClickCircleLayout from "../ClickCircleLayout";

export interface Props {
  isLoading: boolean;
  saveChart: () => Promise<string>;
}

export const CreateChartClickCircle: React.FC<Props> = ({ isLoading, saveChart }) => {
  const { data: sessionData } = useSession();
  const r = useRouter();
  
  const [savedChartId, setSavedChartId] = useState<null | string>('null');
  const save = async () => {
    const uuid = await saveChart();
    setSavedChartId(uuid);
  }

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
      topButton={<ClickCircleButton {...EMPTY_CIRCLE_PROPS} />}
      rightButton={
        sessionData ? ( 
          <ClickCircleButton
            icon={<CloudArrowUpIcon className={CLICK_CIRCLE_STYLE} />}
            isLoading={isLoading}
            label="save chart"
            onClick={(e: React.BaseSyntheticEvent) => {
              e.stopPropagation();
              save();
            }}
          />
        ) : <ClickCircleButton {...EMPTY_CIRCLE_PROPS} />
      }
      leftButton={
        sessionData ? ( 
          <ClickCircleButton
          icon={<ListBulletIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="your charts"
          onClick={(e: React.BaseSyntheticEvent) => {
            e.stopPropagation();
            r.push('/mobile/your-charts')
          }}
        />
        ) : <ClickCircleButton {...EMPTY_CIRCLE_PROPS} />
      }
    /> 
  );
};

export default CreateChartClickCircle;

/* {isPreviewOverlayVisible && (
  const [isPreviewOverlayVisible, setIsPreviewOverlayVisible] = useState(false);
  
  // const onClickDownload = () => {
  //  setIsPreviewOverlayVisible(true);
  // };
  
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