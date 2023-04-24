import { ArrowRightIcon, CloudArrowUpIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ICON_STYLE } from '../../../lib/FilterButton/FilterButton';
import LoadingBouncer from '../../../lib/LoadingBouncer/LoadingBouncer';
import ActionButton from './ActionButton/ActionButton';
import ProfileCircle from './ProfileCircle/ProfileCircle';

export interface Props {
  deleteChart: () => Promise<void>;
  isChartOwner: boolean;
  isLoading: boolean;
  onEditPage: boolean;
  save: () => void;
  savedChartId: string | null;
  showOnboardingFlow: boolean;
}

const DesktopActions: React.FC<Props> = ({
  deleteChart,
  isLoading,
  isChartOwner,
  onEditPage,
  save,
  savedChartId,
  showOnboardingFlow,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {showOnboardingFlow ? null : (
          <>
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
                {!onEditPage ? (
                  <Link href={`/charts/${savedChartId}`}>
                    <ActionButton
                      label="View newly saved chart"
                      onClick={() => undefined}
                      text={<ArrowRightIcon className={ICON_STYLE} />}
                      variant="regular"
                    />
                  </Link>
                ) : null}
                <ActionButton
                  label="Delete chart"
                  hasGradientIndicator={false}
                  onClick={() => deleteChart()}
                  text={<TrashIcon className={ICON_STYLE} />}
                  variant="regular"
                />
              </>
            ) : null}
          </>
        )}
      </div>
      <ProfileCircle />
    </>
  );
};

export default DesktopActions;
