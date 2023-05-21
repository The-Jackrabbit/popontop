import { ListRowMode } from '../../../lib/Mobile/ListRow/ListRow';
import { useRouter } from 'next/router';
import ViewChartsActionBar from './ViewChartsActionBar';
import CreateChartActionBar from './CreateChartActionBar';
import { EditChartActionBar } from './EditChartActionBar';

export interface Props {
  actionOverlayClassName?: string;
  className?: string;
  editChart?: () => Promise<string>;
  hasNonEmptyList: boolean;
  isActive: boolean;
  isEditLoading: boolean;
  isLoading: boolean;
  listMode: ListRowMode;
  isReadOnly?: boolean;
  onClickSettings: () => void;
  onClickSearch: () => void;
  onClickDeleteMode: () => void;
  onClickRearrangeMode: () => void;
  createChart: () => Promise<string>;
  setIsActive: (val: boolean) => void;
}

export const ActionBar: React.FC<Props> = ({
  actionOverlayClassName,
  className = '',
  editChart,
  hasNonEmptyList,
  isActive,
  isEditLoading,
  isLoading,
  isReadOnly = false,
  listMode,
  onClickDeleteMode,
  onClickRearrangeMode,
  onClickSearch,
  onClickSettings,
  createChart,
  setIsActive,
}) => {
  const router = useRouter();
  const isOnEditPage = router.pathname.includes('/mobile/charts/');
  const isOnCreateChartPage = router.pathname === '/mobile';
  const isOnViewChartsPage = router.pathname === '/mobile/your-charts';

  const SHARED_ACTION_BAR_PROPS = {
    actionOverlayClassName,
    className,
    isActive,
    listMode,
    onClickDeleteMode,
    setIsActive,
  };

  const SHARED_EDITOR_ACTION_BAR_PROPS = {
    hasNonEmptyList,
    onClickSettings,
    onClickSearch,
    onClickRearrangeMode,
  };

  return (
    <>
      {isOnCreateChartPage ? (
        <CreateChartActionBar
          {...SHARED_ACTION_BAR_PROPS}
          {...SHARED_EDITOR_ACTION_BAR_PROPS}
          isLoading={isLoading}
          createChart={createChart}
        />
      ) : null}
      {isOnViewChartsPage ? (
        <ViewChartsActionBar {...SHARED_ACTION_BAR_PROPS} />
      ) : null}
      {isOnEditPage && editChart ? (
        <EditChartActionBar
          {...SHARED_ACTION_BAR_PROPS}
          {...SHARED_EDITOR_ACTION_BAR_PROPS}
          editChart={editChart}
          isLoading={isEditLoading}
          isReadOnly={isReadOnly}
        />
      ) : null}
    </>
  );
};

export default ActionBar;
