import { ListBulletIcon, PaintBrushIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import AccountCircleButton from './ActionOverlay/ClickCircle/ClickCircleButton/AccountCircleButton/AccountCircleButton';
import ClickCircleButton, {
  CLICK_CIRCLE_STYLE,
} from './ActionOverlay/ClickCircle/ClickCircleButton/ClickCircleButton';
import ClickCircleLayout from './ActionOverlay/ClickCircle/ClickCircleLayout';

export const ViewChartClickCircle = () => {
  const router = useRouter();
  const onClickCreateChart = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    event.stopPropagation();
    router.push('/mobile');
  };

  const onClickYourCharts = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    event.stopPropagation();
    router.push('/mobile/your-charts');
  };

  return (
    <ClickCircleLayout
      bottomButton={<AccountCircleButton />}
      centerButton={null}
      leftButton={
        <ClickCircleButton
          icon={<PaintBrushIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="create chart"
          onClick={onClickCreateChart}
        />
      }
      rightButton={
        <ClickCircleButton
          icon={<ListBulletIcon className={CLICK_CIRCLE_STYLE} />}
          isLoading={false}
          label="your charts"
          onClick={onClickYourCharts}
        />
      }
      topButton={
        <ClickCircleButton
          icon={null}
          isLoading={false}
          label=""
          onClick={() => undefined}
        />
      }
    />
  );
};

export default ViewChartClickCircle;
