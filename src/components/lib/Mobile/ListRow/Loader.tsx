export interface Props {
  index: number;
}

export const Loader: React.FC<Props> = ({ index }) => (
  <div className="w-full flex justify-between mb-2">
    <div
      className="
        text-xs basis-1/12 
        w-12
        flex flex-col shrink-0 justify-center content-center items-center
      "
    >
      <p>{1 + index}</p>
    </div>
    <div className="basis-2/12 justify-start">
      <div
        className="
          w-[60px] h-[60px]
          bg-neutral-200 dark:bg-neutral-700 animate-pulse
        "></div>
    </div>
    <div
      className="basis-8/12 ml-2 content-start grow-0 overflow-x-hidden justify-end flex flex-col"
    >
      <div
        className="
          text-xs
          w-48 h-[16px]
          bg-neutral-200 dark:bg-neutral-700 mb-1
          animate-pulse
        "
      />
      <div
        className="
          text-xs
          w-36 h-[16px]
          bg-neutral-200 dark:bg-neutral-700
          animate-pulse
        "
      />
   </div>
   <div className="basis-1/12"></div>
 </div>
);
