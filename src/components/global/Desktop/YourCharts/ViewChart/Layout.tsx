import { useState } from 'react';
import { useSize } from '../../../../lib/Grid/Grid';

export interface Props {
  backgroundColor: string;
  chart: (size: DOMRect) => JSX.Element;
  modifyChartButton: React.ReactNode;
  title: React.ReactNode;
}

export const Layout: React.FC<Props> = ({
  backgroundColor,
  chart,
  modifyChartButton,
  title,
}) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const size = useSize(target);
  return (
    <div className="flex h-full flex-row justify-between">
      <div style={{ backgroundColor }}>
        <div className="relative flex flex-col h-full px-4">
          <div className="pb-4 grow-0 basis-0">{title}</div>
          <div className="grow-0" ref={setTarget}>{size ? chart(size) : null}</div>
          <div className='flex basis-2/12 grow justify-end items-end align-bottom'>{modifyChartButton}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
