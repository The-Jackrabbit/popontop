import React from 'react';
import { MouseEventHandler } from 'react';

export interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  isLoading?: boolean;
  mode?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const Button: React.FC<Props> = ({ onClick, children, className = '', isLoading = false, mode = 'primary' }) => {
  return (
    <button
      className={className + ` 
        bg-rose-400 hover:bg-rose-300 active:bg-rose-500
        focus-within:outline focus-within:outline-rose-200
         p-4 outline-none w-full outline-dashed
        text-lg  dark:text-white placeholder:text-neutral-400
        flex justify-center content-center
        border-transparent rounded-md
        text-neutral-50
        ${mode === 'primary' ? 'bg-rose-400 ' : 'bg-neutral-300'}
      `}
      onClick={(e) => onClick(e)}
    >
      {!isLoading
        ? children
        : (
          <div className="animate-spin">💿</div>
        )
      }
    </button>
  );
};

export default Button;