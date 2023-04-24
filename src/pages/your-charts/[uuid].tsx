import { NextPage } from 'next';
import SearchResultsWrapper from '../../components/global/Desktop/YourCharts/SearchResultsWrapper';
import ViewChart from '../../components/global/Desktop/YourCharts/ViewChart/ViewChart';

export const ViewYourChart: NextPage = () => {
  return (
    <SearchResultsWrapper
      page={
        <div className="h-full">
          <ViewChart />
        </div>
      }
    />
  );
};

export default ViewYourChart;
