import DesktopPage from '../../../lib/DesktopPage/DesktopPage';
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import ActionButton from '../DesktopEditor/Actions/ActionButton/ActionButton';
import { DesktopActions } from '../DesktopEditor/Actions/DesktopActions';
import ProfileCircle from '../DesktopEditor/Actions/ProfileCircle/ProfileCircle';
import { DesktopEditorLoader } from '../DesktopEditor/Loader';
import { DesktopSidebarLoader } from '../DesktopEditor/Sidebar/Loader';
import { Color } from '../DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import { ICON_STYLE } from '../../../lib/FilterButton/FilterButton';

const Loader = ({ isChartOwner }: { isChartOwner: boolean }) => {
  return (
    <DesktopPage
      actions={
        <DesktopActions
          bottomSection={<ProfileCircle />}
          topSection={
            <>
              {isChartOwner ? (
                <ActionButton
                  onClick={() => undefined}
                  disabled={true}
                  label="Save changes"
                  text={<CloudArrowUpIcon className={ICON_STYLE} />}
                />
              ) : null}
              <ActionButton
                onClick={() => undefined}
                disabled={true}
                hasGradientIndicator={false}
                label="Copy chart"
                text={<PencilSquareIcon className={ICON_STYLE} />}
              />
              {isChartOwner ? (
                <ActionButton
                  label="Delete chart"
                  hasGradientIndicator={false}
                  onClick={() => undefined}
                  text={<TrashIcon className={ICON_STYLE} />}
                />
              ) : null}
            </>
          }
        />
      }
      pageContent={
        <div className="h-full">
          <DesktopEditorLoader />
        </div>
      }
      sidebar={
        <div className="h-full overflow-x-visible">
          <DesktopSidebarLoader
            pageTitleBorderBottom={Color.blue}
            pageTitle={isChartOwner ? 'edit chart' : 'viewing chart'}
          />
        </div>
      }
    />
  );
};

export default Loader;
export const EditChartLoader = Loader;
