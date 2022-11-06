
import Link from 'next/link';
import { useState } from 'react';
import useChartList from '../../../../frontend/hooks/use-chart-list';
import { Album } from '../../../../types/Albums';
import { trpc } from '../../../../utils/trpc';
import Button from '../../../lib/Button/Button';
import ButtonAccessory from '../../../lib/ButtonAccessory/ButtonAccessory';
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
      <div>
        <ActionButton
          onClick={() => save()}
          disabled={isLoading}
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
              onClick={() => undefined}
              text="➾"
              variant="regular"
            />
          </Link>
        )}
      </div>
      <div>
        <ProfileCircle />     
      </div>
    </>
  );
};

export default DesktopActions;
