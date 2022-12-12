import { useState } from "react";
import { useSize } from "../../../../lib/Grid/Grid";

export interface Props {
  backgroundColor: string;
  chart: (size: DOMRect) => JSX.Element;
  title: React.ReactNode;
}

export const Layout: React.FC<Props> = ({
  backgroundColor,
  chart,
  title,
}) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const size = useSize(target);
  return (
    <div
      className="flex flex-row h-full justify-between"
    >
      <div style={{ backgroundColor }}>
        <div className="flex flex-col items-stretch px-4 relative">
          <div className="pb-4">
            {title}
          </div>
          <div ref={setTarget}>
            {size ? chart(size) : null}
          </div>
        </div>

      </div>
    </div>
  )
};

export default Layout;