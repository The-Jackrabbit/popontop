import type { NextPage } from "next";
import { useState } from "react";
import List from "../components/mobile-editor/List/List";
import Settings from "../components/global/Sidebar/Settings/Settings";
import MobileSheet from "../components/lib/MobileSheet/MobileSheet";


const Mobile: NextPage = () => {
  const [isOpen, setIsOpen] = useState(!false);

  if (!isOpen) {
    return (
      <List />
    );
  }

  return (
    <MobileSheet onClose={() => setIsOpen(false)}>
      <Settings />
    </MobileSheet>
  );
};

export default Mobile;
