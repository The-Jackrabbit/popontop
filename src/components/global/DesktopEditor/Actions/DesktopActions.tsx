import { ArrowRightIcon, CloudArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ICON_STYLE } from '../../../lib/FilterButton/FilterButton';
import LoadingBouncer from '../../../lib/LoadingBouncer/LoadingBouncer';
import ActionButton from './ActionButton/ActionButton';
import ProfileCircle from './ProfileCircle/ProfileCircle';

export interface Props {
  isChartOwner: boolean;
  isLoading: boolean;
  save: () => void;
  savedChartId: string | null;
}

const DesktopActions: React.FC<Props> = ({
  isLoading,
  isChartOwner,
  save,
  savedChartId
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <ActionButton
          onClick={() => save()}
          disabled={isLoading}
          label="Save chart"
          text={
            !isLoading ? (
              <CloudArrowUpIcon className={ICON_STYLE} />
            ) : (
              <LoadingBouncer />
            )
          }
          variant="primary"
        />
        {savedChartId && isChartOwner ? (
          <>
            <Link href={`/charts/${savedChartId}`}>
              <ActionButton
                label="View newly saved chart"
                onClick={() => undefined}
                text={<ArrowRightIcon className={ICON_STYLE} />}
                variant="regular"
              />
            </Link>
            <ActionButton
              label="Delete chart"
              onClick={() => undefined}
              text={<TrashIcon className={ICON_STYLE} />}
              variant="regular"
            />
          </>
        ) : null}
      </div>
      <ProfileCircle />
    </>
  );
};

export default DesktopActions;
