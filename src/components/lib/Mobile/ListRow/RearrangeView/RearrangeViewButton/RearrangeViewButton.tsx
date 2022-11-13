import React from "react";

export interface Props {
  className: string;
  children: [React.ReactNode, React.ReactNode];
  onClick: () => void;
}

export const RearrangeViewButton: React.FC<Props> = ({
  className,
  children,
  onClick,
}) => (
  <button
    className={`
      ${className} h-auto   
      active:bg-neutral-200 dark:active:bg-neutral-700
      flex justify-center items-center 
    `}
    onClick={() => onClick()}
  >
    <p 
      className="
        shadow-lg shadow-black 
      bg-black rounded-lg
        w-16 h-16
      ">
        {children}
      </p>
  </button>
);

export default RearrangeViewButton;
