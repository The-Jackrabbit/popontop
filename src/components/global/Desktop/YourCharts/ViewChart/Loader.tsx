import Grid from '../../../../lib/Grid/Grid';
import TitleLoader from '../../../../lib/Title/Loader';
import Layout from './Layout';

export const Loader: React.FC = () => {
  return (
    <Layout
      backgroundColor={''}
      title={<TitleLoader />}
      chart={(size: DOMRect) => (
        <Grid
          borderColor={''}
          borderSize={1}
          columns={10}
          itemComponent={() => <div></div>}
          rows={10}
          size={size}
        />
      )}
      modifyChartButton={null}
    />
  );
};

export default Loader;
