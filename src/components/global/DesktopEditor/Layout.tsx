import React, { useState } from 'react';
import { useSize } from '../../lib/Grid/Grid';

export interface Props {
  backgroundColor: string;
  isReadonly: boolean;
  title: React.ReactNode;
  chart: (size: DOMRect) => JSX.Element | null;
  list: React.ReactNode;
  actions: React.ReactNode;
}

const Layout: React.FC<Props> = ({ 
  backgroundColor,
  isReadonly,
  title,
  chart,
  list,
  actions,
}) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const size = useSize(target);
  return (
    <div
      className="flex flex-row h-full justify-between"
    >
      <div className="flex flex-col items-center px-4 relative w-full">
        {title}
        <div ref={setTarget} className="basis-full w-full">
          {size ? chart(size) : null}
        </div>
      </div>

      {list}
      <div
        className="
          border-neutral-300 dark:border-neutral-800 border-l-2
          flex flex-col justify-between
          pl-4
        "
      >
        {!isReadonly
          ? actions
          : null
        }
      </div>
    </div>
  );
}
export default Layout;
