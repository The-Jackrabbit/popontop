import { useEffect } from 'react';
import { a, useSpring } from 'react-spring';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Props {

}

export const DOT_HOP_ANIMATION = {
  from:{ y: '-5px' },
  to: { y: '5px' },
  loop: { reverse: true },
};

const LoadingBouncer: React.FC<Props> = ({}) => {

  const [dotStyleOne, animateDotStyleOne] = useSpring(() => ({ ...DOT_HOP_ANIMATION,
  }));
  const [dotStyleTwo, animateDotStyleTwo] = useSpring(() => ({ ...DOT_HOP_ANIMATION }));
  const [dotStyleThree, animatedDotStyleThree] = useSpring(() => ({ ...DOT_HOP_ANIMATION }));

  useEffect(() => {
    animateDotStyleOne.pause();
    animateDotStyleTwo.pause();
    animatedDotStyleThree.pause();
    animateDotStyleOne.resume();
    setTimeout(() => {
      animateDotStyleTwo.resume();
    }, 200);
    setTimeout(() => {
      animatedDotStyleThree.resume();
    }, 400);
    // setTimeout(() => animatedDotStyleThree.start(), 1000);
  }, []);

  return (
    <div className="flex flex-row justify-center gap-1 width-full">
      <a.div
        style={dotStyleOne}
        className="bg-neutral-400 rounded-full h-1 w-1"
      />
      <a.div
        style={dotStyleTwo}
        className="bg-neutral-400 rounded-full h-1 w-1"
      />
      <a.div
        style={dotStyleThree}
        className="bg-neutral-400 rounded-full h-1 w-1"
      />
    </div>
  )
}

export default LoadingBouncer;
