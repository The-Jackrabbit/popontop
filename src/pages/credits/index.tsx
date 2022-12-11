import { DndContext } from "@dnd-kit/core";
import type { NextPage } from "next";
import { a } from "react-spring";
import SidebarNav from "../../components/global/DesktopEditor/Sidebar/SidebarNav/SidebarNav";
import useDesktopChartEditor from "../../frontend/hooks/singletons/use-desktop-chart-editor";
import { usePageFadeIn } from "../../frontend/hooks/springs/use-page-fade-in";
import { DraggedAlbum } from "../../frontend/hooks/use-chart/use-chart";
import Layout from "../create-chart/Layout";

const CreateChart: NextPage = () => {
  const { pageOpacity, animateFadeOut, animateFadeIn } = usePageFadeIn();
  const { actions, childrenNodes: { chart }, state } = useDesktopChartEditor({});

  return (
    <DndContext
      autoScroll={false}
      onDragStart={(event) => {
        chart.childrenNodes.list.actions.setDraggedAlbum(event.active.data.current as DraggedAlbum)
      }}
      onDragEnd={(args) => {
        chart.childrenNodes.list.actions.handleDragEnd(args)
      }}
    >
      <Layout>
        <a.div style={pageOpacity} className="overflow-x-visible h-full">
         
        </a.div>
        
        <SidebarNav />

        <a.div style={pageOpacity} className="h-full">
         
        </a.div>
      </Layout>
    </DndContext>
  );
};

export default CreateChart;
