import type { NextPage } from "next";
import { useState } from "react";
import List from "../components/mobile-editor/List/List";
import Settings from "../components/global/Sidebar/Settings/Settings";
import MobileSheet from "../components/lib/MobileSheet/MobileSheet";
import SettingsButton from "../components/global/MobileEditor/SettingsButton/SettingsButton";
import AddAlbumButton from "../components/global/MobileEditor/AddAlbumButton/AddAlbumButton";
import SearchAlbums from "../components/global/MobileEditor/SearchAlbums/SearchAlbums";

const Mobile: NextPage = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(!false);

  return (
    <>
      {isSettingsOpen ? (
        <MobileSheet onClose={() => setIsSettingsOpen(false)}>
          <Settings />
        </MobileSheet>
      ) : null}

      {isSearchOpen ? (
        <MobileSheet onClose={() => setIsSearchOpen(false)}>
          <SearchAlbums onClick={() => undefined} />
        </MobileSheet>
      ) : null}
     
      <SettingsButton onClick={() => setIsSettingsOpen(true)} />
      <AddAlbumButton onClick={() => setIsSearchOpen(true)} />
      <List />
    </>
  );
};

export default Mobile;
