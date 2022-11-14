export interface Props {
  children: React.ReactNode;
}

const MobilePage: React.FC<Props> = ({ children }) => (
  <div
    className="overflow-y-hidden flex "
    onScroll={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <div className="w-screen p-4 overflow-hidden">
     {children}
    </div>
  </div>
);

export default MobilePage;
