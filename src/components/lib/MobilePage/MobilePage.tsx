export interface Props {
  backgroundColor?: string;
  children: React.ReactNode;
}

const MobilePage: React.FC<Props> = ({ backgroundColor = '', children }) => (
  <div
    className="flex h-screen overflow-y-hidden"
    onScroll={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    style={{ backgroundColor }}
  >
    <div className="w-screen overflow-hidden p-4">{children}</div>
  </div>
);

export default MobilePage;
