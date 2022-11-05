import { useState } from "react";
import { a } from "react-spring";
import { useZoomOnHover } from "../../../../../frontend/hooks/springs/use-zoom-on-hover";
import NavDot, { Color } from "./NavDot/NavDot";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {
  page: string;
  setPage: (page: string) => void;
}


export const SidebarNav: React.FC<Props> = ({
  page,
  setPage,
}) => {

  const { zoomOnHoverStyle, onMouseLeave, onMouseOver } = useZoomOnHover();
  return (
    <div className="flex flex-row justify-between items-end">
      <div className="text-5xl">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">
          <a.h1
            style={{...zoomOnHoverStyle}}
            onMouseEnter={() => onMouseOver()}
            onMouseLeave={() => onMouseLeave()}
            className="
              cursor-pointer
              bg-white dark:bg-black
              px-2 py-1 py-1sm:px-4 sm:py-1
              rounded-full
              text-2xl
              shadow-lg 
              dark:shadow-neutral-900
            "
          >
            💿popontop
          </a.h1>
        </a>
      </div>
      <div className="flex flex-row gap-1 justify-between -translate-y-2">
        <NavDot
          isActive={page === 'editor'}
          onClick={() => setPage('editor')}
          color={Color.violet}
          label="Editor"
        />
        <NavDot
          isActive={page === 'your-charts'}
          onClick={() => setPage('your-charts')}
          color={Color.fuchsia}
          label="Your charts"
        />
      </div>
    </div>
  );
}

export default SidebarNav;