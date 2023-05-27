import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface Props {
  chartTemplate: React.ReactNode;
  isMobile: boolean;
  previewNavigator: React.ReactNode;
  setPreviewIndex?: Dispatch<SetStateAction<number>>;
}

export const Layout = ({
  chartTemplate,
  isMobile,
  previewNavigator,
  setPreviewIndex,
}: Props) => {
  const [fitWidth, setFitWidth] = useState<boolean>(false);
  const [height, setHeight] = useState<string>('100%');
  const [width, setWidth] = useState<string>('100%');

  useEffect(() => {
    const parentElement = document.getElementById('parent');
    if (parentElement) {
      const parentWidth = parentElement.offsetWidth;
      const parentHeight = parentElement.offsetHeight;
      const fitWidth = parentWidth >= parentHeight;
      setFitWidth(fitWidth);

      if (fitWidth) {
        setHeight(`${parentHeight}px`);
      } else {
        setWidth(`${parentWidth - 40}px`);
      }
    }
  }, []);

  return (
    <div id="parent" className={`flex h-screen flex-col justify-center`}>
      <div
        className={` ${
          isMobile ? '' : '  h-[calc(100vh_-_3.25rem)] max-w-[75%]'
        } flex w-full items-center justify-center self-center align-middle`}
      >
        <div
          className={` ${
            fitWidth && isMobile ? 'h-auto w-full' : ' w-auto'
          } max-h-full w-3/4`}
          style={isMobile ? { height, width } : {}}
        >
          {chartTemplate}
        </div>
      </div>

      {setPreviewIndex ? (
        <div className="mt-4 h-min shrink basis-9">{previewNavigator}</div>
      ) : null}
    </div>
  );
};

export const DesktopPreviewLayout = Layout;
