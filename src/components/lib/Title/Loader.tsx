import { LOADER_ANIMATED_BACKGROUND } from '../../../constants/colors';
import { Layout } from './Layout';

const LOADER_BLOCK_STYLE = `${LOADER_ANIMATED_BACKGROUND} w-full h-full`;

export const Loader: React.FC = () => (
  <Layout
    title={<div className={LOADER_BLOCK_STYLE} />}
    toggleButton={<div className={LOADER_BLOCK_STYLE} />}
  />
);

export default Loader;
