import { useRouter } from "next/router";
import { ListBulletIcon, PaintBrushIcon, CloudArrowUpIcon } from "@heroicons/react/20/solid";
import AccountCircleButton from "../ClickCircleButton/AccountCircleButton/AccountCircleButton";
import ClickCircleButton, { CLICK_CIRCLE_STYLE } from "../ClickCircleButton/ClickCircleButton";
import ClickCircleLayout from "../ClickCircleLayout";
import React from "react";

export interface Props {
  editChart: () => Promise<string>;
}

export const EditChartClickCircle: React.FC<Props> = ({
  editChart,
}) => {
  const router = useRouter();

  const onClickSaveChanges = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    event.stopPropagation();
    editChart();
  };

  const onClickCreateChart = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    event.stopPropagation();
    router.push('/mobile')
  };

  const onClickYourCharts = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    event.stopPropagation();
    router.push('/mobile/your-charts')
  };

  return (
    <ClickCircleLayout
      bottomButton={<AccountCircleButton />}
      centerButton={null}
      leftButton={
        <ClickCircleButton
          icon={<ListBulletIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="your charts"
          onClick={onClickYourCharts}
        />
      }
      rightButton={
        <ClickCircleButton
          icon={<CloudArrowUpIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="save changes"
          onClick={onClickSaveChanges}
        />
      }
      topButton={
        <ClickCircleButton
          icon={<PaintBrushIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="create chart"
          onClick={onClickCreateChart}
        />
      }
    /> 
  );
};

export default EditChartClickCircle;
