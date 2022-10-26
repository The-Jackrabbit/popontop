
import { MouseEventHandler } from 'react';

export interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  mode?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<Props> = ({ onClick, children, mode = 'primary' }) => {
  return (
    <button
    className={`
    bg-rose-400 hover:bg-rose-300 active:bg-rose-500
    focus-within:outline focus-within:outline-rose-200
     p-4 outline-none w-full outline-dashed
    text-lg text-neutral-900 dark:text-white placeholder:text-neutral-400
    flex justify-center content-center
    border-transparent rounded-md
    ${mode === 'primary' ? 'bg-rose-400 text-neutral-50' : 'bg-neutral-300'}
  `}
  onClick={(e) => onClick(e)}>{children}</button>
  );
};

export default Button;