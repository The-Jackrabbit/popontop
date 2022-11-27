import React, { useEffect, useState } from 'react';
import { NextPage } from "next";
import Link from "next/link";
import ActionBar from "../../../components/global/MobileEditor/ActionBar/ActionBar";
import { ListRowMode } from "../../../components/lib/Mobile/ListRow/ListRow";
import MobilePage from "../../../components/lib/MobilePage/MobilePage";
import { trpc } from "../../../utils/trpc";
import { DeleteRowButton } from '../../../components/lib/Mobile/Row/DeleteRowButton/DeleteRowButton';
import { colorMap } from '../../../constants/colors';
import { Color } from '../../../components/global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';

const YourCharts: NextPage = () => {
  const { data } = trpc.charts.getUserCharts.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const deleteChartMutation = trpc.charts.delete.useMutation();
  const [listMode, setListMode] = useState(ListRowMode.NORMAL);
  const [visibilityMap, setVisibilityMap] = useState(
    new Array(1000).map(() => true)
  );
  useEffect(() => {
    setVisibilityMap(new Array(1000).map(() => true));
  }, [data]);

  const onClickDeleteChart = async (
    event: React.BaseSyntheticEvent<MouseEvent>,
    chartUuid: string,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    await deleteChartMutation.mutateAsync({ uuid: chartUuid ? chartUuid : ''});
    // await mutation.refetch();
  }
  
  return (
    <MobilePage>
      <h1 className="text-4xl font-bold">your charts</h1>
      <div
        className={`
          ${colorMap[Color.fuchsia]}
          shadow-md
          rounded-full w-full h-1 my-4 
        `}
      ></div>
      <div>
        {data ? (
          <>
            {data.map((chart, index) => (
              <>
              {visibilityMap[index]
                ? (<div></div>)
                : (
                  <Link
                    href={`/mobile/charts/${chart.uuid}`}
                    key={JSON.stringify(chart) + index.toString()}
                  >
                    <div 
                      className="
                        flex justify-between
                        mb-2 h-16
  
                        cursor-pointer
                        hover:bg-neutral-300 active:bg-neutral-400
                        dark:hover:bg-neutral-800 dark:active:bg-neutral-700
                      "
                    > 
                      <div className="basis-5/6">
                        <p className="text-2xl font-semibold">{chart.name}</p>
                        <p className='text-xs dark:text-neutral-400 font-light'>
                          created: {chart.created_at ? chart.created_at.toDateString() : ''}
                        </p>
                      </div>
                      <div className="basis-1/6">
                        {listMode === ListRowMode.DELETE && (
                          <DeleteRowButton
                            className="
                              h-full w-full
                            "
                            onClick={(e) => {
                              setVisibilityMap((visibilityMap) => {
                                const newVizMap = [...visibilityMap];
                                newVizMap[index] = !false;
                                return newVizMap;
                              })
                              onClickDeleteChart(e, chart.uuid as string)
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                )}
              </>
            ))}
          </>
        ) :
          <div className="max-h-[80vh] overflow-y-scroll">
           {[...new Array(100)].map((_, index) => (
              <div
                key={index}
                className="
                  flex justify-between
                  mb-2 h-16
                  cursor-pointer
                  hover:bg-neutral-300 active:bg-neutral-400
                  dark:hover:bg-neutral-800 dark:active:bg-neutral-700
                "
              > 
                <div className="basis-full">
                  <p
                    className="
                      animate-pulse text-2xl w-full bg-neutral-200 dark:bg-neutral-700
                      h-[36px]
                    "
                  />
                  <p
                    className="
                      animate-pulse text-xs mt-1 w-36 h-[16px] bg-neutral-200 dark:bg-neutral-700
                    "
                  />
                </div>
              </div>
            ))}
          </div>
        }
      
        <ActionBar
          actionOverlayClassName="-translate-x-0 asdf"
          hasNonEmptyList={false}
          listMode={listMode}
          onClickDeleteMode={() => setListMode(listMode === ListRowMode.DELETE ? ListRowMode.NORMAL : ListRowMode.DELETE)}
          onClickRearrangeMode={() => undefined} 
          isEditLoading={false}
          isLoading={false}
          onClickSettings={() => undefined}
          onClickSearch={() => undefined}
          isActive={true}
          setIsActive={() => undefined}
          saveChart={() => new Promise((res) => res(''))}
        />
      </div>
    </MobilePage>
  );
}

export default YourCharts;
