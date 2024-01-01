import React, { Dispatch, SetStateAction } from 'react';
import { SwitchExpandingPill } from '../../../../lib/ExpandingPill/SwitchExpandingPill/SwitchExpandingPill';
import { colorMap } from '../../../../../constants/colors';
import { Color } from './SidebarNav/NavDot/NavDot';
import Layout from './Layout';
import SidebarNav from './SidebarNav/SidebarNav';
import NumericExpandingPill from '../../../../lib/ExpandingPill/NumericExpandingPill/NumericExpandingPill';
import { DesktopChartEditorHookNode } from '../../../../../frontend/hooks/singletons/use-desktop-chart-editor';
import { CHART_TEMPLATE_VALUES } from '../../DesktopPreview/DesktopPreview';

export interface Props {
  isChartOwner: boolean;
  desktopChartEditor: DesktopChartEditorHookNode;
  pageTitle: string;
  pageTitleBorderBottom: Color;
  setIsPreviewVisible: Dispatch<SetStateAction<boolean>>;
  isPreviewVisible: boolean;
}

export const PreviewSidebar: React.FC<Props> = ({
  desktopChartEditor,
  isChartOwner,
  pageTitle,
  pageTitleBorderBottom,
  setIsPreviewVisible,
  isPreviewVisible,
}) => {
  return (
    <Layout
      title={
        <>
          <h1 className="text-4xl font-bold">{pageTitle}</h1>
          <div
            className={`
              ${colorMap[pageTitleBorderBottom]}
              my-4
              h-1 w-full rounded-full shadow-md
            `}
          />
        </>
      }
      nav={<SidebarNav />}
      sidebarContent={
        isChartOwner ? (
          <>
            <div className="flex flex-row flex-wrap items-center gap-2 ">
              <NumericExpandingPill
                isInitiallyExpanded={true}
                label="Chart format"
                max={CHART_TEMPLATE_VALUES.length - 1}
                min={0}
                setValue={desktopChartEditor.actions.setPreviewIndex}
                value={desktopChartEditor.state.previewIndex}
              />
              <SwitchExpandingPill
                className="inline-block"
                label="show screenshot mode"
                setValue={(value: boolean | null) =>
                  setIsPreviewVisible(Boolean(value))
                }
                value={isPreviewVisible}
              />
            </div>
          </>
        ) : null
      }
    />
  );
};

export default PreviewSidebar;
