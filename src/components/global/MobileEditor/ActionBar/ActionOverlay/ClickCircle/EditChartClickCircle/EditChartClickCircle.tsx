import { useRouter } from "next/router";
import { PaintBrushIcon } from "@heroicons/react/20/solid";
import AccountCircleButton from "../ClickCircleButton/AccountCircleButton/AccountCircleButton";
import ClickCircleButton from "../ClickCircleButton/ClickCircleButton";
import ClickCircleLayout from "../ClickCircleLayout";

export interface Props {
  editChart: () => Promise<string>;
}

export const CLICK_CIRCLE_STYLE = `
  h-6 w-6
  flex text-center align-center content-center justify-center
  text-neutral-400 dark:text-neutral-50
  `;
  
export const EMPTY_CIRCLE_PROPS = {
  icon: null,
  isLoading: false,
  label: '',
  onClick: () => undefined,
};

export const EditChartClickCircle: React.FC<Props> = ({
  editChart,
}) => {
  const r = useRouter();

  return (
    <ClickCircleLayout
      bottomButton={<AccountCircleButton />}
      centerButton={null}
      leftButton={<ClickCircleButton {...EMPTY_CIRCLE_PROPS} />}
      rightButton={
        <ClickCircleButton
          icon={<PaintBrushIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="save changes"
          onClick={(e: any) => {
            e.stopPropagation();
            editChart();
          }}
        />
      }
      topButton={
        <ClickCircleButton
          icon={<PaintBrushIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="create chart"
          onClick={(e: any) => {
            e.stopPropagation();
            r.push('/mobile')
          }}
        />
      }
    /> 
  );
};

export default EditChartClickCircle;
