export interface Props {
  backgroundColor?: string | null;
  children: React.ReactNode;
}

const MobilePage: React.FC<Props> = ({ backgroundColor = '', children }) => (
  <div
    className="flex h-screen overflow-y-hidden"
    onScroll={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    style={backgroundColor ? { backgroundColor } : {}}
  >
    <div className="w-screen overflow-hidden p-4">{children}</div>
  </div>
);

export default MobilePage;
