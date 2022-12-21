export interface Props {
  toggleButton: React.ReactNode;
  title: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ toggleButton, title }) => (
  <div
    className="
      z-30 box-content flex
      h-auto w-auto
      items-center
      justify-between overflow-hidden rounded-lg 
      bg-white
      p-4 shadow-md
      dark:bg-[#0a0a0a] dark:shadow-neutral-800 
    "
  >
    <div
      className="
        flex min-h-[2rem]
        w-full
        justify-between gap-2
        text-lg text-neutral-500 dark:text-neutral-200
      "
    >
      <div className="h-auto basis-11/12">{title}</div>
      <div className="flex h-auto basis-1/12 justify-end">{toggleButton}</div>
    </div>
  </div>
);
