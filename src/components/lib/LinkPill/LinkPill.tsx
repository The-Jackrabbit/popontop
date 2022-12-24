import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { PILL } from '../../../constants/shared-styles';
import { ICON_STYLE } from '../FilterButton/FilterButton';

export interface Props {
  children: string;
  href: string;
}

export const LinkPill: React.FC<Props> = ({ children, href }) => {
  return (
    <div
      className={
        PILL + 'flex w-min justify-between whitespace-nowrap rounded-full'
      }
    >
      <Link href={href}>{children}</Link>
      <ArrowRightOnRectangleIcon className="ml-4 h-4 w-4 text-neutral-900 dark:text-neutral-50" />
    </div>
  );
};

export default LinkPill;
