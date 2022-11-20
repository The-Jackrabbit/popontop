import { useRouter } from "next/router";
import CreateChartClickCircle from "./ClickCircle/CreateChartClickCircle/CreateChartClickCircle";
import { EditChartClickCircle } from "./ClickCircle/EditChartClickCircle/EditChartClickCircle";

export interface Props {
  className?: string;
  editChart?: () => Promise<string>;
  isLoading: boolean;
  onExit: (a: any) => void;
  saveChart: () => Promise<string>;
}

export const ActionOverlay: React.FC<Props> = ({
  className = '-translate-x-4',
  editChart,
  isLoading,
  onExit,
  saveChart,
}) => {
  const router = useRouter();
  const isOnEditPage = router.pathname.includes('/mobile/charts/');
  const isOnCreateChartPage = router.pathname === '/mobile';

  return (
    <div
      className={`
        bg-[rgba(100,100,100,_0.0)]]
        bg-gradient-to-b
        from-[rgba(240,240,240,0)]
        via-[rgba(240,240,240,0.2)]
        to-[rgba(240,240,240,1)]
        dark:from-[rgba(23,23,23,0)]
        dark:to-[rgba(23,23,23,1)]
        h-[110vh] w-[100vw] fixed top-0 left-0 
      
        flex flex-col items-center justify-center
        z-50
        ${className}
      `}
      onClick={onExit}
    >
      <div className="basis-1/2" />
      <div className="basis-1/2">
        {isOnEditPage && editChart ? (
          <EditChartClickCircle editChart={editChart} />
        ) : null}
        {isOnCreateChartPage ? (
          <CreateChartClickCircle saveChart={saveChart} isLoading={isLoading} />
        ) : null}
      </div>
    </div>
  );
}


export default ActionOverlay;
