import React, { Dispatch, SetStateAction } from 'react';
import { SettingsHookNode } from '../../../../../../frontend/hooks/use-chart/use-chart-settings';
import SelectExpandingPill from '../../../../../lib/ExpandingPill/SelectExpandingPill/SelectExpandingPill';
import SwitchExpandingPill from '../../../../../lib/ExpandingPill/SwitchExpandingPill/SwitchExpandingPill';
import TextExpandingPill from '../../../../../lib/ExpandingPill/TextExpandingPill/TextExpandingPill';
import { CHART_TEMPLATES } from '../../../DesktopPreview/DesktopPreview';

export interface Props {
  settings: SettingsHookNode;
  setIsPreviewVisible: Dispatch<SetStateAction<boolean>>;
  isPreviewVisible: boolean;
  toggleEntries: (value: boolean) => void;
  toggleTitle: (value: boolean) => void;
}

export const DesktopSettings: React.FC<Props> = ({
  settings,
  toggleEntries,
  toggleTitle,
}) => (
  <>
    <div className="flex flex-row flex-wrap items-center gap-2 ">
      {/* <SwitchExpandingPill
        className="inline-block"
        label="show screenshot mode"
        setValue={(value: boolean | null) =>
          setIsPreviewVisible(Boolean(value))
        }
        value={isPreviewVisible}
      /> */}
      <SelectExpandingPill
        isInitiallyExpanded={true}
        label="Chart format"
        options={Array.from(CHART_TEMPLATES).map(([chartFormat]) => ({
          label: chartFormat,
          value: chartFormat,
        }))}
        setValue={settings.actions.setChartFormat}
        value={settings.state.chartFormat}
      />
      {/* <Select<ChartFormatKey>
        label="Chart format"
        isOpenByDefault={true}
        options={Array.from(CHART_TEMPLATES).map(([chartFormat]) => ({
          label: chartFormat,
          value: chartFormat,
        }))}
        setChosenValue={settings.actions.setChartFormat}
        value={settings.state.chartFormat}
        isMobile={false}
      /> */}
      <TextExpandingPill
        label="Title background color"
        setValue={(value: string) =>
          settings.actions.setTitleBackgroundColor(value)
        }
        value={settings.state.titleBackgroundColor}
      />
      <TextExpandingPill
        label="Background color"
        setValue={(value: string) => settings.actions.setBackgroundColor(value)}
        value={settings.state.backgroundColor}
      />
      <TextExpandingPill
        label="Text color"
        setValue={(value: string) => settings.actions.setTextColor(value)}
        value={settings.state.textColor}
      />
      <TextExpandingPill
        label="Border color"
        setValue={(value: string) => settings.actions.setBorderColor(value)}
        value={settings.state.borderColor}
      />
      {/* <TextExpandingPill
        label="Album overlay color"
        setValue={(value: string) =>
          settings.actions.setAlbumOverlayColor(value)
        }
        value={settings.state.albumOverlayColor}
      /> */}
      <SwitchExpandingPill
        className="inline-block"
        label="list albums?"
        setValue={(value: boolean | null) => toggleEntries(Boolean(value))}
        value={settings.state.showEntries}
      />
      <SwitchExpandingPill
        className="inline-block"
        label="show title?"
        setValue={(value: boolean | null) => toggleTitle(Boolean(value))}
        value={settings.state.showTitle}
      />
      {/* <NumericExpandingPill
        label="Number of albums"
        min={0}
        max={100}
        setValue={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((value: number) => settings.actions.setNumberOfEntries(value)) as any
        }
        value={settings.state.numberOfEntries}
      /> */}
      {/* <NumericExpandingPill
        label="Number of columns"
        min={0}
        max={10}
        setValue={
          ((value: number) => settings.actions.setColumns(value)) as any
        }
        value={settings.state.columns}
      />
      <NumericExpandingPill
        label="Number of rows"
        min={0}
        max={10}
        setValue={((value: number) => settings.actions.setRows(value)) as any}
        value={settings.state.rows}
      /> */}
    </div>
  </>
);
export default DesktopSettings;
