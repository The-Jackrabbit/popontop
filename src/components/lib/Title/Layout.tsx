
export interface Props {
  toggleButton: React.ReactNode;
  title: React.ReactNode;
}

export const Layout: React.FC<Props> = ({
  toggleButton,
  title,
}) => (
  <div
    className="
      rounded-lg bg-white dark:bg-[#0a0a0a]
      shadow-lg dark:shadow-neutral-800
      box-content
      py-4 px-4 sm:px-4 
      z-30
      overflow-hidden
      w-auto h-auto
      flex justify-between items-center 
    "
  >
    <div
      className="
        flex justify-between
        gap-2
        min-h-[2rem] w-full
        text-lg text-neutral-500 dark:text-neutral-200
      "
    >
      <div className="h-auto basis-11/12">
        {title}
      </div>
      <div className="h-auto basis-1/12 flex justify-end">
        {toggleButton}
      </div>
    </div>
  </div>
);