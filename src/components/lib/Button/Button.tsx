import React from 'react';
import { MouseEventHandler } from 'react';

export interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  isLoading?: boolean;
  mode?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const Button: React.FC<Props> = ({
  onClick,
  children,
  className = '',
  isLoading = false,
  mode = 'primary',
}) => {
  return (
    <button
      className={
        className +
        ` 
        flex w-full content-center
        justify-center rounded-md
         border-transparent bg-rose-400 p-4 text-lg
        text-neutral-50  outline-none outline-dashed
        placeholder:text-neutral-400 focus-within:outline focus-within:outline-rose-200
        hover:bg-rose-300 active:bg-rose-500
        dark:text-white
        ${mode === 'primary' ? 'bg-rose-400 ' : 'bg-neutral-300'}
      `
      }
      onClick={(e) => onClick(e)}
    >
      {!isLoading ? children : <div className="animate-spin">💿</div>}
    </button>
  );
};

export default Button;
