
import Link from 'next/link';
import { useState } from 'react';
import useChartList from '../../../../frontend/hooks/use-chart-list';
import { Album } from '../../../../types/Albums';
import { trpc } from '../../../../utils/trpc';
import Button from '../../../lib/Button/Button';
import ActionButton from './ActionButton/ActionButton';
import ProfileCircle from './ProfileCircle/ProfileCircle';

export interface Props {
  list: Album[];
  chartTitle: string;
}

const DesktopActions: React.FC<Props> = ({ list, chartTitle }) => {
  const [savedChartId, setSavedChartId] = useState<null | string>(null);
  const mutation = trpc.charts.create.useMutation();
  const saveChart = async (): Promise<string> => {
    const t = { name: chartTitle, albums: list };
    const result = await mutation.mutateAsync(t);

    return result.chart.uuid ?? '';
  };

  const save = async () => {
    const uuid = await saveChart();
    setSavedChartId(uuid);
  }
  
  return (
    <div className="pt-5 border-l-2 h-screen actions-container flex flex-col justify-between">
      <div>
        <ActionButton
          onClick={() => save()}
          text="💾"
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
    </div>
  );
};

export default DesktopActions;
