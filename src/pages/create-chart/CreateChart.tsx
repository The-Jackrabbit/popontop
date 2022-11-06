import type { NextPage } from "next";
import { useState } from "react";
import { a } from "react-spring";
import DesktopSidebar from "../../components/global/DesktopEditor/Sidebar/DesktopSidebar";
import { SidebarNav } from "../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav";
import { usePageFadeIn } from "../../frontend/hooks/springs/use-page-fade-in";
import Layout from "./Layout";
import useChart from '../../frontend/hooks/use-chart';
import { DndContext } from "@dnd-kit/core";
import DesktopEditor from "../../components/global/DesktopEditor/DesktopEditor";


const App: NextPage = () => {
  const [page, setPage] = useState('editor');
  const {
    pageOpacity,
    animateFadeOut,
    animateFadeIn,
  } = usePageFadeIn();
  const {
    isLoading,
    titleStyle,
    listStyles,
    chart,
  } = useChart({});

  return (
    <DndContext
      autoScroll={false}
      onDragStart={
        (event) => {
          chart.actions.setDraggedAlbum(event.active.data.current as any)
        }
      }
      onDragEnd={(args) => {
        chart.actions.handleDragEnd(args)
      }}
    >
      <Layout>
        <a.div
          style={pageOpacity}
          className="overflow-x-visible h-full"
        >
          {page === 'editor' 
            ? (
                <DesktopSidebar settings={chart.settings} />
              )
            : null
          }
        </a.div>
        <SidebarNav
          page={page}
          setPage={(page) => {
            animateFadeOut(() => {
              setPage(page);
              animateFadeIn();
            });  
          }}
        />
        <a.div style={pageOpacity} className="h-full">
          {page === 'editor' 
            ? (
                <DesktopEditor
                  chart={chart}
                  listStyles={listStyles}
                  isLoading={isLoading}
                  titleStyle={titleStyle}
                />
              )
            : null
          }
        </a.div>
      </Layout>
    </DndContext>
  );
};

export default App;

