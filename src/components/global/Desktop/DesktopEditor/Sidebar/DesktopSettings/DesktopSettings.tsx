import React, { Dispatch, SetStateAction } from 'react';
import { SettingsHookNode } from '../../../../../../frontend/hooks/use-chart/use-chart-settings';
import NumericExpandingPill from '../../../../../lib/ExpandingPill/NumericExpandingPill/NumericExpandingPill';
import SwitchExpandingPill from '../../../../../lib/ExpandingPill/SwitchExpandingPill/SwitchExpandingPill';
import TextExpandingPill from '../../../../../lib/ExpandingPill/TextExpandingPill/TextExpandingPill';

export interface Props {
  settings: SettingsHookNode;
  setIsPreviewVisible: Dispatch<SetStateAction<boolean>>;
  isPreviewVisible: boolean;
  toggleAlbums: (value: boolean) => void;
  toggleTitle: (value: boolean) => void;
}

export const DesktopSettings: React.FC<Props> = ({
  settings,
  setIsPreviewVisible,
  isPreviewVisible,
  toggleAlbums,
  toggleTitle,
}) => (
  <>
    <div className="flex flex-row flex-wrap items-center gap-2 ">
      <SwitchExpandingPill
        className="inline-block"
        label="show screenshot mode"
        setValue={(value: boolean | null) =>
          setIsPreviewVisible(Boolean(value))
        }
        value={isPreviewVisible}
      />
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
      <TextExpandingPill
        label="Album overlay color"
        setValue={(value: string) =>
          settings.actions.setAlbumOverlayColor(value)
        }
        value={settings.state.albumOverlayColor}
      />
      <SwitchExpandingPill
        className="inline-block"
        label="list albums?"
        setValue={(value: boolean | null) => toggleAlbums(Boolean(value))}
        value={settings.state.showAlbums}
      />
      <SwitchExpandingPill
        className="inline-block"
        label="show title?"
        setValue={(value: boolean | null) => toggleTitle(Boolean(value))}
        value={settings.state.showTitle}
      />
      <NumericExpandingPill
        label="Number of albums"
        min={0}
        max={100}
        setValue={
          ((value: number) => settings.actions.setNumberOfAlbums(value)) as any
        }
        value={settings.state.numberOfAlbums}
      />
      <NumericExpandingPill
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
      />
    </div>
  </>
);
export default DesktopSettings;
