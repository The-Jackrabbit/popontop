import React from 'react';

export interface Props {
  className: string;
  children: React.ReactNode;
  onClick: () => void;
}

export const RearrangeViewButton: React.FC<Props> = ({
  className,
  children,
  onClick,
}) => (
  <button
    className={`
      ${className}  
      flex h-full
      items-center justify-center border-r-[2px] 
      last-of-type:border-r-0 
      active:bg-neutral-200 dark:border-neutral-800
      dark:active:bg-neutral-700
    `}
    onClick={() => onClick()}
  >
    <p
      className="
        w-full
        text-2xl
        font-light
        tracking-widest dark:text-neutral-500
      "
    >
      {children}
    </p>
  </button>
);

export default RearrangeViewButton;
