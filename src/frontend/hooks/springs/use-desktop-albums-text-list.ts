import { SpringValue, useSpring } from 'react-spring';

export interface DesktopAlbumsTextList {
  listStyle: { width: SpringValue<string> };
  toggleAlbums: (value: boolean) => void;
}

export const useDesktopAlbumsTextList = ({
  setShowAlbums,
  showAlbums,
}: {
  setShowAlbums: (value: boolean) => void;
  showAlbums: boolean;
}): DesktopAlbumsTextList => {
  const [listStyle, animateListStyles] = useSpring(() => ({
    from: { width: !showAlbums ? '0px' : '200px' },
  }));

  const toggleAlbums = (val: boolean): void => {
    setShowAlbums(val);
    animateListStyles.start({
      width: val ? '200px' : '0px',
    });
  };

  return { listStyle, toggleAlbums };
};
