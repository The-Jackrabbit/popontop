import Link from 'next/link';
import LoadingBouncer from '../../../lib/LoadingBouncer/LoadingBouncer';
import ActionButton from './ActionButton/ActionButton';
import ProfileCircle from './ProfileCircle/ProfileCircle';

export interface Props {
  isLoading: boolean;
  save: () => void;
  savedChartId: string | null;
}

const DesktopActions: React.FC<Props> = ({
  isLoading,
  save,
  savedChartId,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <ActionButton
          onClick={() => save()}
          disabled={isLoading}
          label="Save chart"
          text={
            !isLoading
              ? (
                <p>💾</p>
              )
              : <LoadingBouncer />
          }
          variant="primary"
        />
        {savedChartId && (
          <Link href={`/charts/${savedChartId}`}>
            <ActionButton
              label="View newly saved chart"
              onClick={() => undefined}
              text="➾"
              variant="regular"
            />
          </Link>
        )}
      </div>
      <ProfileCircle />
    </>
  );
};

export default DesktopActions;
