export interface Props {
  index: number;
}

export const Loader: React.FC<Props> = ({ index }) => (
  <div className="mb-2 flex w-full justify-between">
    <div
      className="
        flex w-12 
        shrink-0
        basis-1/12 flex-col content-center items-center justify-center text-xs
      "
    >
      <p>{1 + index}</p>
    </div>
    <div className="basis-2/12 justify-start">
      <div
        className="
          h-[60px] w-[60px]
          animate-pulse bg-neutral-200 dark:bg-neutral-700
        "
      ></div>
    </div>
    <div className="ml-2 flex grow-0 basis-8/12 flex-col content-start justify-end overflow-x-hidden">
      <div
        className="
          mb-1
          h-[16px] w-48
          animate-pulse bg-neutral-200 text-xs
          dark:bg-neutral-700
        "
      />
      <div
        className="
          h-[16px]
          w-36 animate-pulse
          bg-neutral-200 text-xs
          dark:bg-neutral-700
        "
      />
    </div>
    <div className="basis-1/12"></div>
  </div>
);
