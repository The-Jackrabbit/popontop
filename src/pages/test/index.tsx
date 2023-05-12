import type { NextPage } from 'next';
import { getThemeColorMetaTag } from '../../utils/mobile-theme';

const Credits: NextPage = () => {
  const change = (color: string) => {
    const { themeColorMetaTag } = getThemeColorMetaTag();
    debugger;
    themeColorMetaTag.setAttribute('content', color);
  };
  return (
    <div>
      <button onClick={() => change('red')}>Red</button>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={() => change('green')}>Green</button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <button onClick={() => change('blue')}>Blue</button>
    </div>
  );
};

export default Credits;
