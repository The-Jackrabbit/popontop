// import { a, useSpring } from "react-spring";

export interface Props {
  className?: string;
  index: number;
  isActive: boolean;
}

const Notch: React.FC<Props> = ({
  className = '',
  index,
  isActive = false,
}) => {
  let passiveStyle = '';
  if (index%20 === 0) {
    passiveStyle = `
      bg-green-300
      w-full
      h-2
      rounded-lg
      z-50
    `;
  }
  if (index%10 === 0 && index%20 !== 0) {
    passiveStyle = `
      bg-green-300
      w-full
      h-2
      rounded-lg
      z-50
    `;
  }

  const activeStyle =  `
    bg-red-300
    w-full
    h-2
    rounded-lg
    z-50
  `;

  const classNames = [
    isActive ? activeStyle : passiveStyle,
    className,
  ].join(' ');

  return (
    <div
      className={classNames}
              key={index}
            ></div>
         
  );
};

export default Notch;
