import React, { useState } from 'react';
import { useSize } from '../../lib/Grid/Grid';

export interface Props {
  actions: React.ReactNode;
  backgroundColor: string;
  chart: (size: DOMRect) => JSX.Element | null;
  isReadonly: boolean;
  listTwo: React.ReactNode;
  title: React.ReactNode;
}

const Layout: React.FC<Props> = ({
  actions,
  // backgroundColor,
  chart,
  isReadonly,
  listTwo,
  title,
}) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const size = useSize(target);
  return (
    <div className="flex h-full flex-row justify-between">
      <div className="relative flex w-full flex-col items-center px-4">
        <div className="min-h-min w-full">{title}</div>
        <div ref={setTarget} className="w-full basis-full">
          {size ? chart(size) : null}
        </div>
        <div className="h-min">{listTwo}</div>
      </div>
      <div
        className="

          flex flex-col justify-between
          border-l-2 border-neutral-300 pl-4
          dark:border-neutral-800
        "
      >
        {!isReadonly ? actions : null}
      </div>
    </div>
  );
};
export default Layout;
