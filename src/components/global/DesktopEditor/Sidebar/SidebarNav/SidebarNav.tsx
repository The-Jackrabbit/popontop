import { useRouter } from "next/router";
import { a } from "react-spring";
import { useZoomOnHover } from "../../../../../frontend/hooks/springs/use-zoom-on-hover";
import NavDot, { Color } from "./NavDot/NavDot";

export const SidebarNav: React.FC = () => {
  const { zoomOnHoverStyle, onMouseLeave, onMouseOver } = useZoomOnHover();
  const router = useRouter();
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
              px-2 py-1 sm:py-1
              rounded-full
              min-w-96
              text-sm lg:text-xl
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
          ariaLabel="editor page"
          isActive={router.route === '/'}
          onClick={() => router.push('/')}
          color={Color.green}
          label="Editor"
        />
        <NavDot
          ariaLabel="charts page"
          isActive={router.route === '/your-charts'}
          onClick={() => router.push('your-charts')}
          color={Color.fuchsia}
          label="Your charts"
        />
        <NavDot
          ariaLabel="credits page"
          isActive={router.route === '/credits'}
          onClick={() => router.push('credits')}
          color={Color.violet}
          label="Credits"
        />
      </div>
    </div>
  );
}

export default SidebarNav;