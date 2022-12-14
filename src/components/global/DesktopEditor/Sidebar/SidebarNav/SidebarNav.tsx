import { useRouter } from 'next/router';
import { a } from 'react-spring';
import { useZoomOnHover } from '../../../../../frontend/hooks/springs/use-zoom-on-hover';
import NavDot, { Color } from './NavDot/NavDot';

export const SidebarNav: React.FC = () => {
  const { zoomOnHoverStyle, onMouseLeave, onMouseOver } = useZoomOnHover();
  const router = useRouter();
  return (
    <div className="flex flex-row items-end justify-between">
      <div className="text-5xl">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">
          <a.h1
            style={{ ...zoomOnHoverStyle }}
            onMouseEnter={() => onMouseOver()}
            onMouseLeave={() => onMouseLeave()}
            className="
              min-w-96
              cursor-pointer rounded-full
              bg-white px-2 py-1
              text-sm
              shadow-lg
              dark:bg-black dark:shadow-neutral-900
              sm:py-1 
              lg:text-xl
            "
          >
            💿popontop
          </a.h1>
        </a>
      </div>
      <div className="flex -translate-y-2 flex-row justify-between gap-1">
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
};

export default SidebarNav;
