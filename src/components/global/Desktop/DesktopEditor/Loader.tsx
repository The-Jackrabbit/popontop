import React from 'react';
import { TitleLoader } from '../../../lib/Title/Loader';
import { DesktopChartLoader } from './DesktopChart/Loader';
import Layout from './Layout';
import { ListOfEntriesLoader } from './ListOfEntries/Loader';

export interface Props {
  showOnboardingFlow?: boolean;
}

const Loader: React.FC<Props> = ({ showOnboardingFlow = false }) => {
  const numberOfEntries = 10;
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
      list={<ListOfEntriesLoader numberOfEntries={numberOfEntries} />}
      chart={<DesktopChartLoader numberOfEntries={numberOfEntries} />}
    />
  );
};

export default Loader;
export const DesktopEditorLoader = Loader;
