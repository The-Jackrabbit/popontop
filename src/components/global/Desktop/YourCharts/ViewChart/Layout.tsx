
export interface Props {
  backgroundColor: string;
  chart: React.ReactNode;
  title: React.ReactNode;
}

export const Layout: React.FC<Props> = ({
  backgroundColor,
  chart,
  title,
}) => {
  return (
    <div className="flex w-full h-full flex-row justify-between">
      <div style={{ backgroundColor }} className="relative w-full flex flex-col h-full">
        <div className=" grow-0 basis-0">{title}</div>
        <div className="grow-0">{chart}</div>
      </div>
    </div>
  );
};

export default Layout;

export const ViewChartLayout = Layout;
