import { trpc } from '../../../../../utils/trpc';
import DesktopChart from '../../../DesktopEditor/DesktopChart/DesktopChart';
import Title from '../../../../lib/Title/Title';
import { Layout } from './Layout';
import { Loader } from './Loader';
import LinkPill from '../../../../lib/LinkPill/LinkPill';

export interface Props {
  chartUuid: string;
}

export const ViewChart: React.FC<Props> = ({ chartUuid }) => {
  const { data: chart, isLoading } = trpc.charts.getById.useQuery(
    { uuid: chartUuid },
    {
      enabled: true, // disable this query from automatically running
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!chart) {
    return <div>not found</div>;
  }

  return (
    <Layout
      backgroundColor={chart?.settings?.background_color ?? ''}
      title={
        <Title
          chartTitle={chart.name}
          isReadOnly={true}
          showIntroduction={!true}
          textColor={chart?.settings?.text_color ?? ''}
        />
      }
      chart={() => (
        <DesktopChart
          isReadOnly={chart.isReadOnly}
          items={chart.albums ?? []}
          borderColor={chart?.settings?.border_color ?? ''}
          borderSize={1}
        />
      )}
      modifyChartButton={
        <LinkPill href={`/charts/${chartUuid}`}>
          <h1 className='text-lg'>open in editor</h1>
        </LinkPill>
      }
    />
  );
};
