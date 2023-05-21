import { ActionBar } from './ActionBar/ActionBar';
import { ChartSettings } from '@prisma/client';
import MobilePage from '../../lib/MobilePage/MobilePage';
import { Album } from '../../../types/Albums';
import { Loader as ListLoader } from '../../global/MobileEditor/List/Loader';
import { UseChartListContext } from '../../../frontend/hooks/singletons/use-mobile-chart-editor';
import { TitleLoader } from '../../lib/Title/Loader';
import { ListRowMode } from '../../lib/Mobile/ListRow/ListRow';

export interface Props {
  chartName?: string;
  chartUuid?: string;
  context?: UseChartListContext;
  initialList?: Album[];
  initialSettings?: ChartSettings;
  isReadOnly?: boolean;
}

const Loader: React.FC<Props> = () => (
  <MobilePage>
    <div>
      <TitleLoader />

      <ListLoader />

      <ActionBar
        isEditLoading={false}
        className="-translate-x-4"
        editChart={async () => ''}
        isLoading={true}
        listMode={ListRowMode.NORMAL}
        onClickSettings={() => undefined}
        onClickSearch={() => undefined}
        onClickDeleteMode={() => undefined}
        onClickRearrangeMode={() => undefined}
        hasNonEmptyList={true}
        isActive={false}
        isReadOnly={true}
        setIsActive={() => undefined}
        createChart={async () => ''}
      />
    </div>
  </MobilePage>
);

export default Loader;
export const MobileEditorLoader = Loader;
