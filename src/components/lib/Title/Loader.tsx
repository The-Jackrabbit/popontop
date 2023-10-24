import LoadingBouncer from '../LoadingBouncer/LoadingBouncer';
import { Layout } from './Layout';

export const Loader: React.FC = () => (
  <Layout
    title={<div className="animate-pulse">Loading the chart</div>}
    toggleButton={
      <div className="translate-y-3">
        <LoadingBouncer />
      </div>
    }
  />
);

export default Loader;
export const TitleLoader = Loader;
