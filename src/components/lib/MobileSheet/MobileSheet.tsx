import React, { useEffect, useState } from 'react';

export interface Props {
  children?: React.ReactNode;
  isTop?: boolean;
  layer?: number;
  onClose: () => void;
}

export const MobileSheet: React.FC<Props> = ({
  children,
  isTop = true,
  layer = 0,
  onClose,
}) => {
  const [windowHeight, setWindowHeight] = useState('100vh');
  useEffect(() => {
    if (window) {
      setWindowHeight(`${window.innerHeight}px`)
    }
  }, []); 

  return (
    <div
      style={{ height: windowHeight, marginTop: layer*10 }}
      className={`
        overflow-y-scroll w-screen h-[${windowHeight}]
        z-${(1+layer)*10}
        shadow-inner
        fixed inset-0
        justify-center ${isTop ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-neutral-200 dark:bg-neutral-700'}  rounded-t-2xl
      `}
    >
      <div onClick={() => onClose()} className="h-6 w-screen flex justify-center items-center">
        {isTop ? <div className="w-36 h-2 rounded-full bg-neutral-500 dark:bg-neutral-400"></div> : null}
      </div>
      <div className="px-6">
        {children}
      </div>
    </div>
  )
};

export default MobileSheet;