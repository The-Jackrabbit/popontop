import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { PILL } from '../../../constants/shared-styles';

export interface Props {
  children: React.ReactNode;
  href: string;
}

export const LinkPill: React.FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <div
        className={
          '!px-3 !py-4 ' + PILL + '  flex w-min justify-between items-center whitespace-nowrap rounded-full'
        }
      >
        {children}
        <ArrowRightOnRectangleIcon className="ml-4 h-4 w-4 text-neutral-900 dark:text-neutral-50" />
      </div>
    </Link>
  );
};

export default LinkPill;
