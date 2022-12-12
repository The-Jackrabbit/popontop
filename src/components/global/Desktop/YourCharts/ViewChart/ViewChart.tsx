import { useEffect } from "react";
import { trpc } from "../../../../../utils/trpc";
import DesktopChart from "../../../DesktopEditor/DesktopChart/DesktopChart";
import Title from "../../../../lib/Title/Title";
import { Layout } from "./Layout";
import { Loader } from "./Loader";


export interface Props {
  chartUuid: string;
}

export const ViewChart: React.FC<Props> = ({
  chartUuid,
}) => {
  const { data: chart, isLoading } = trpc.charts.getById.useQuery({ uuid: chartUuid }, {
    enabled: true, // disable this query from automatically running
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!chart) {
    return <div>not found</div>
  }

  return (
    <Layout
      backgroundColor={chart?.settings?.background_color ?? ''}
      title={
        <Title
          chartTitle={chart.name}
          isReadOnly={true}
          showIntroduction={!true}
          textColor="black"
        />
      }
      chart={(size: DOMRect) =>
        <DesktopChart
          size={size}
          isReadOnly={chart.isReadOnly}
          numberOfColumns={10}
          numberOfRows={10}
          items={chart.albums ?? []}
          backgroundColor={chart?.settings?.background_color ?? ''}
          borderColor={chart?.settings?.border_color ?? ''}
          borderSize={ 1}
        />
      }
    />
  )
}