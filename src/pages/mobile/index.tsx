import type { NextPage } from 'next';
import MobileEditor from '../../components/global/MobileEditor/MobileEditor';
import { UseChartListContext } from '../../frontend/hooks/singletons/use-mobile-chart-editor';

const Mobile: NextPage = () => {
  return <MobileEditor isLoading={false} context={UseChartListContext.ADD} />;
};

export default Mobile;
