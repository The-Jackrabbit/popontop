import React, { useState } from 'react';
import { useSize } from '../../lib/Grid/Grid';

export interface Props {
  backgroundColor: string;
  chart: (size: DOMRect) => JSX.Element | null;
  isReadonly: boolean;
  listTwo: React.ReactNode;
  title: React.ReactNode;
}

const Layout: React.FC<Props> = ({
  backgroundColor,
  chart,
  isReadonly,
  listTwo,
  title,
}) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const size = useSize(target);
  return (
    <div
      style={{ backgroundColor }}
      className="flex h-full flex-row justify-between"
    >
      <div className="relative flex w-full flex-col items-center gap-8 px-4">
        <div className="min-h-min w-full">{title}</div>
        <div ref={setTarget} className="w-full basis-1/2">
          {size ? chart(size) : null}
        </div>
        <div className="w-full">{listTwo}</div>
      </div>
    </div>
  );
};
export default Layout;
