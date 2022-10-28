
import { useState, useEffect } from "react";
import { animated,config, useSpring } from "react-spring";
import AddAlbumButton from "../AddAlbumButton/AddAlbumButton";
import SettingsButton from "../SettingsButton/SettingsButton";

export interface Props {
  onClickSettings: () => void;
  onClickSearch: () => void;
}

function Number() {
  const [flip, set] = useState(false)
  const { number } = useSpring({
    reset: true,
    reverse: flip,
    from: { number: 0 },
    number: 1,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  })

  return <animated.div>{number.to(n => n.toFixed(2))}</animated.div>
}

const ActionBar: React.FC<Props> = ({ onClickSettings, onClickSearch }) => {
  const [flip, set] = useState(false)
  const [style, api] = useSpring(() => ({
    to: { x: '0px', y: '-300px' },
    from: { x: '0px', y: '200px' },
    // reset: true,
    // reverse: flip,
    // delay: 200,

    config: {
      bounce: 0.1,
      friction: 20,
      mass:4,
      tension: 200,
    },
    loop: true,
    reverse: true,
    // onRest: () => set(!flip),
  }));

  const [expandstyle, expandapi] = useSpring(() => ({
    to: { scale: 3, bg: 'orange'  },
    from: { scale: 1, bg: 'red'  },
    reset: true,
    reverse: true,
    delay: 200,
    loop: true,
    // onRest: () => set(!flip),
  }));

  const [isAtPeak , setIsAtPeak ] = useState(false);

  // props.
  const start  = () => {
    api.start({ y: '-300px', onRest: () => {
      setIsAtPeak(true);
    } });
    // api.stop()
  }

  const end  = () => {
    setIsAtPeak(false);
    api.start({ y: '200px' });
    // api.stop()
  }

  return (
    <div  className="w-[calc(100vw_-_2rem)] justify-between items-center absolute bottom-0 flex flex-row">
    <SettingsButton
      onClick={(e) => {
        e.stopPropagation();
        onClickSettings();
      }}
    />
    <div
      onPointerUp={() => end()}
      onPointerDown={() => start()}
      className="grow-1 flex content-center justify-center"
    >
      {/* <Number /> */}
      <animated.div
        onTouchCancel={() => console.log('onTouchCancel')}
        onTouchEnd={() => console.log('onTouchEnd')}
        onTouchMove={() => console.log('onTouchMove')}
        onTouchStart={() => console.log('onTouchStart')}
        onPointerCancel={() => console.log('onPointerCancel')}
        onPointerDown={() => console.log('onPointerDown')}
        onPointerEnter={() => console.log('onPointerEnter')}
        onPointerLeave={() => console.log('onPointerLeave')}
        onPointerMove={() => console.log('onPointerMove')}
        onPointerOut={() => console.log('onPointerOut')}
        onPointerOver={() => console.log('onPointerOver')}
        onPointerUp={() => console.log('onPointerUp')}
       
        style={{ ...style, ...expandstyle}}
        className="bg-rose-600 absolute z-20 rounded-full h-24 w-24 "
      ></animated.div>
      {isAtPeak ? (
        <div className="absolute w-20 h-96 z-10 bg-blue-500 translate-y-[calc(-300px_+_48px)]">

        </div>
      ) : null}
      <h1  onTouchMove={(e) => {
          console.log('t')
          e.stopPropagation();
        }} className="select-none text-lg z-30">💿popontop</h1>
    </div>
    <AddAlbumButton
      onClick={(e) => {
        e.stopPropagation();
        onClickSearch();
      }}
    />
  </div>
  );
};

export default ActionBar;
