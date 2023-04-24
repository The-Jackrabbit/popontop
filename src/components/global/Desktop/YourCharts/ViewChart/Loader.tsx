import Grid from '../../../../lib/Grid/Grid';
import TitleLoader from '../../../../lib/Title/Loader';
import Layout from './Layout';

export const Loader: React.FC = () => {
  return (
    <Layout
      backgroundColor={''}
      title={<TitleLoader />}
      chart={() => (
        <Grid
          borderColor={''}
          borderSize={1}
          items={[]}
          itemComponent={() => <div></div>}
        />
      )}
    />
  );
};

export default Loader;
