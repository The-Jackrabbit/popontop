
import dynamic from 'next/dynamic'
import Link from 'next/link';
import { Suspense, useState } from 'react'
import Button from "../../../../../../lib/Button/Button";

export interface Props {
  isSaveLoading: boolean;
  onSave: () => Promise<string>;
}

const DynamicDownLoadButton = dynamic(() => import('./DownloadButton'), {
  ssr: false,
});

const PageOne: React.FC<Props> = ({
  isSaveLoading,
  onSave,
}) => {
  const [savedChartId, setSavedChartId] = useState<null | string>(null);
  const save = async () => {
    const uuid = await onSave();
    debugger;
    setSavedChartId(uuid);
  }
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
      {savedChartId
        ? (
          <Link
      
            href={"/charts/" + savedChartId}
          >
           <Button       className="mt-8 bg-neutral-50 hover:bg-rose-300 active:bg-rose-500
            focus-within:outline focus-within:outline-rose-200
             p-4 outline-none w-full outline-dashed
            text-lg   placeholder:text-neutral-400
            flex justify-center content-center
            border-transparent rounded-md
            text-neutral-700 dark:text-neutral-700 hover:text-neutral-100" onClick={() => undefined}>View chart</Button>
          </Link>
        )
        : null}
      <div id="chartPreview" className="bg-rose-500 w-full mt-12 h-full">

      </div>
    </>
  );
};

export default PageOne;