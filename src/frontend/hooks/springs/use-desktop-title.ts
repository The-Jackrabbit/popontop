import { SpringValue, useSpring } from "react-spring";

export interface DesktopTitleState {
  toggleTitle: (value: boolean) => void;
  titleStyle: { height: SpringValue<string>; };
}

const useDesktopTitle = (
  {
    setShowTitle,
    showTitle,
  }: {
    setShowTitle: (value: boolean) => void;
    showTitle: boolean;
  }
) : DesktopTitleState => {
  const [titleStyle, animateTitleStyle] = useSpring(() => ({
    from: { height: showTitle ? '72px' : '0px' },
  }));

  const toggleTitle = (val: boolean): void => {
    setShowTitle(val);
    animateTitleStyle.start({
      height: val ? '72px' : '0px',
    });
  };

  return {
    toggleTitle,
    titleStyle,
  };
};

export default useDesktopTitle;
