import React from 'react';
import { TitleLoader } from '../../../lib/Title/Loader';
import { DesktopChartLoader } from './DesktopChart/Loader';
import Layout from './Layout';
import { ListOfAlbumsLoader } from './ListOfAlbums/Loader';

export interface Props {
  showOnboardingFlow?: boolean;
}

const Loader: React.FC<Props> = ({ showOnboardingFlow = false }) => {
  const numberOfAlbums = 10;
  return showOnboardingFlow ? (
    <div>
      <p className="text-2xl">
        to get quickly started,
        <kbd className="mx-4">click</kbd>
        anywhere on the sidebar
      </p>
    </div>
  ) : (
    <Layout
      uuid=""
      title={<TitleLoader />}
      list={<ListOfAlbumsLoader numberOfAlbums={numberOfAlbums} />}
      chart={<DesktopChartLoader numberOfAlbums={numberOfAlbums} />}
    />
  );
};

export default Loader;
export const DesktopEditorLoader = Loader;
