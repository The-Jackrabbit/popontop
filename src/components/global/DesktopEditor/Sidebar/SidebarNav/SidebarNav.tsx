import { useRouter } from 'next/router';
import { a } from 'react-spring';
import { useZoomOnHover } from '../../../../../frontend/hooks/springs/use-zoom-on-hover';
import { useSession } from 'next-auth/react';
import NavDot, { Color } from './NavDot/NavDot';

export const SidebarNav: React.FC = () => {
  const { zoomOnHoverStyle, onMouseLeave, onMouseOver } = useZoomOnHover();
  const { data: sessionData } = useSession();
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
              text-xs
              shadow-lg
              dark:bg-black dark:shadow-neutral-900
              sm:py-1
              md:text-sm xl:text-xl
            "
          >
            💿popontop
          </a.h1>
        </a>
      </div>
      <div className="flex -translate-y-2 flex-row justify-between gap-1">
        <NavDot
          ariaLabel="editor page"
          isActive={router.route === '/' || router.route.includes('/charts/')}
          onClick={() => router.push('/')}
          color={Color.fuchsia}
          label="Editor"
        />
        {!sessionData ? null :
          <NavDot
            ariaLabel="charts page"
            isActive={router.route.includes('/your-charts')}
            onClick={() => router.push('/your-charts')}
            color={Color.amber}
            label="Your charts"
          />
        }
        <NavDot
          ariaLabel="credits page"
          isActive={router.route === '/credits'}
          onClick={() => router.push('/credits')}
          color={Color.blue}
          label="Credits"
        />
      </div>
    </div>
  );
};

export default SidebarNav;
