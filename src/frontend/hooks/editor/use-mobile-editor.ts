import { useState } from "react";
import { ListRowMode } from "../../../components/lib/Mobile/ListRow/ListRow";
import { useDragSheetDown } from "../springs/use-drag-sheet-down";

const height = 667;

export const useMobileEditor = (
  transitionFromInstructionToTitle: () => void
) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isActive, setIsActive] = useState(true); 
  const [listMode, setListMode] = useState<ListRowMode>(ListRowMode.NORMAL);
  const [isViewModeActive, setIsViewModeActive] = useState(false);
  const sheet = useDragSheetDown(height, () => {
    setIsSettingsOpen(false);
    setIsSearchOpen(false);
    setIsViewModeActive(false);
    transitionFromInstructionToTitle();
  });

  const onClickSheetDeadArea = () => isSheetOpen ? close() : undefined;

  const onClickSettings = () => {
    setIsSettingsOpen(true);
    sheet.open({ canceled: false });
  };

  const onClickSearch = () => {
    setIsSearchOpen(true);
    sheet.open({ canceled: false });
  };

  const onClickView = () =>{
    setIsViewModeActive(!isViewModeActive);
    sheet.open({ canceled: false });
  };

  const onClickRearrangeMode = () => setListMode(
    (listMode) => listMode !== ListRowMode.REARRANGE
      ? ListRowMode.REARRANGE
      : ListRowMode.NORMAL
    );

  const onClickDeleteMode = () => setListMode(
    (listMode) => listMode !== ListRowMode.DELETE
      ? ListRowMode.DELETE
      : ListRowMode.NORMAL
  );

  const openSearchView = () => {
    setIsSearchOpen(true);
    sheet.open({ canceled: false });
  };

  const isSheetOpen = isSettingsOpen || isSearchOpen;

  return {
    actions: {
      onClickRearrangeMode,
      onClickDeleteMode,
      onClickSearch,
      onClickSettings,
      onClickView,
      openSearchView,
      onClickSheetDeadArea,
      setIsActive,
    },
    state: {
      isActive,
      isSearchOpen,
      isSettingsOpen,
      isSheetOpen,
      isViewModeActive,
      listMode,
      sheet,
    },
  };
};

export default useMobileEditor;