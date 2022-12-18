export interface Props {
  children: React.ReactNode;
}

const MobilePage: React.FC<Props> = ({ children }) => (
  <div
    className="flex h-screen overflow-y-hidden"
    onScroll={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <div className="w-screen overflow-hidden p-4">{children}</div>
  </div>
);

export default MobilePage;
