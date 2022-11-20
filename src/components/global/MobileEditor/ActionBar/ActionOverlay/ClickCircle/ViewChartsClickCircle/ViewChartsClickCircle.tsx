import { useRouter } from "next/router";
import AccountCircleButton from "../ClickCircleButton/AccountCircleButton/AccountCircleButton";
import ClickCircleButton, { CLICK_CIRCLE_STYLE, EMPTY_CIRCLE_PROPS } from "../ClickCircleButton/ClickCircleButton";
import ClickCircleLayout from "../ClickCircleLayout";
import { PaintBrushIcon } from '@heroicons/react/20/solid';

export const ViewChartsClickCircle: React.FC =  () => {
  const router = useRouter();
  
  return (
    <ClickCircleLayout
      bottomButton={<AccountCircleButton />}
      centerButton={null}
      leftButton={<ClickCircleButton {...EMPTY_CIRCLE_PROPS} />}
      rightButton={<ClickCircleButton {...EMPTY_CIRCLE_PROPS} />}
      topButton={
        <ClickCircleButton
          icon={<PaintBrushIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="create chart"
          onClick={(e: React.BaseSyntheticEvent) => {
            e.stopPropagation();
            router.push('/mobile')
          }}
        />
      }
    /> 
  );
};

export default ViewChartsClickCircle;
