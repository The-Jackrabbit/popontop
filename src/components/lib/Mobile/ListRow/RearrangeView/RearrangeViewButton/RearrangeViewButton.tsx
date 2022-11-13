import React from "react";

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
      active:bg-neutral-200 dark:active:bg-neutral-700
      flex justify-center items-center 
      h-full 
      border-r-[2px] dark:border-neutral-800
      last-of-type:border-r-0
    `}
    onClick={() => onClick()}
  >
    <p 
      className="
        w-full
        font-light
        dark:text-neutral-500
        text-2xl tracking-widest
      ">
        {children}
      </p>
  </button>
);

export default RearrangeViewButton;
