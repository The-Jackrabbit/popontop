
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
    <div
      className="flex flex-row h-full justify-between"
    >
      <div style={{ backgroundColor }}>
        <div className="flex flex-col items-stretch px-4 relative">
          <div className="pb-4">
            {title}
          </div>
          <div>
            {chart}
          </div>
        </div>

      </div>
    </div>
  )
};

export default Layout;