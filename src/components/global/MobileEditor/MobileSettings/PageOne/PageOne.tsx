import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import Button from '../../../../lib/Button/Button';

export interface Props {
  isSaveLoading: boolean;
  onSave: () => Promise<string>;
}

const DynamicDownLoadButton = dynamic(() => import('./DownloadButton'), {
  ssr: false,
});

const PageOne: React.FC<Props> = ({ isSaveLoading, onSave }) => {
  const [savedChartId, setSavedChartId] = useState<null | string>('null');
  const save = async () => {
    const uuid = await onSave();
    setSavedChartId(uuid);
  };
  return (
    <>
      <Suspense fallback={<p>Loading download button...</p>}>
        <DynamicDownLoadButton />
      </Suspense>
      <Button
        className="mt-8"
        isLoading={isSaveLoading}
        mode="secondary"
        onClick={() => save()}
      >
        Save chart
      </Button>
      {savedChartId ? (
        <Link href={'/mobile/charts/' + savedChartId}>
          <Button
            className="
                mt-8 flex w-full content-center
                justify-center rounded-md
                border-transparent bg-neutral-50 p-4 text-lg
                text-neutral-700   outline-none
                outline-dashed placeholder:text-neutral-400 focus-within:outline
                focus-within:outline-rose-200 hover:bg-rose-300
                hover:text-neutral-100 active:bg-rose-500 dark:text-neutral-700
              "
            onClick={() => undefined}
          >
            View your chart in mobile mode
          </Button>
        </Link>
      ) : null}
      {savedChartId ? (
        <Link href={'/charts/' + savedChartId}>
          <Button
            className="
                mt-8 flex w-full content-center
                justify-center rounded-md
                border-transparent bg-green-200 p-4 text-lg
                text-neutral-700   outline-none
                outline-dashed placeholder:text-neutral-400 focus-within:outline
                focus-within:outline-rose-200 hover:bg-green-200
                hover:text-neutral-100 active:bg-rose-500 dark:text-neutral-700
              "
            onClick={() => undefined}
          >
            View your chart in desktop mode
          </Button>
        </Link>
      ) : null}
    </>
  );
};

export default PageOne;
