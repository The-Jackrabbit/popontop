import { SettingsHookNode } from '../../../../frontend/hooks/use-chart/use-chart-settings';
import PageTwo from './PageTwo/PageTwo';

export interface Props {
  isSaveLoading: boolean;
  onSave: () => Promise<string>;
  settings: SettingsHookNode;
}

export const MobileSettings: React.FC<Props> = ({ settings }) => {
  return (
    <div className="h-full">
      {/* <HorizontalSwipe> */}
      <div className="flex flex-col">
        <PageTwo
          key="page-two"
          showTitle={settings.state.showTitle}
          setShowTitle={settings.actions.setShowTitle}
          listAlbums={settings.state.showEntries}
          setListAlbums={settings.actions.setShowEntries}
          borderSize={settings.state.borderSize}
          setBorderSize={settings.actions.setBorderSize}
          backgroundColor={settings.state.backgroundColor}
          setBackgroundColor={settings.actions.setBackgroundColor}
          textColor={settings.state.textColor}
          setTextColor={settings.actions.setTextColor}
          titleBackgroundColor={settings.state.titleBackgroundColor}
          setTitleBackgroundColor={settings.actions.setTitleBackgroundColor}
        />
      </div>
      {/* </HorizontalSwipe> */}
    </div>
  );
};

export default MobileSettings;
