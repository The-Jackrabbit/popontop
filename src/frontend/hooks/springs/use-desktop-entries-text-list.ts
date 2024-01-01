import { SpringValue, useSpring } from 'react-spring';

export interface DesktopAlbumsTextList {
  listStyle: { width: SpringValue<string> };
  toggleAlbums: (value: boolean) => void;
}

export const useDesktopEntriesTextList = ({
  setShowEntries,
  showEntries,
}: {
  setShowEntries: (value: boolean) => void;
  showEntries: boolean;
}): DesktopAlbumsTextList => {
  const [listStyle, animateListStyles] = useSpring(() => ({
    from: { width: !showEntries ? '0px' : '200px' },
  }));

  const toggleAlbums = (val: boolean): void => {
    setShowEntries(val);
    animateListStyles.start({
      width: val ? '200px' : '0px',
    });
  };

  return { listStyle, toggleAlbums };
};
