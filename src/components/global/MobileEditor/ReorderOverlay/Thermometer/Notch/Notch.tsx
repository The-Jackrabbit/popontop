// import { a, useSpring } from "react-spring";

export interface Props {
  className?: string;
  index: number;
  isMinorStep: boolean;
  isMajorStep: boolean;
  isActive: boolean;
  label: any;

}

const Notch: React.FC<Props> = ({
  className = 'relative',
  index,
  isActive = false,
  isMinorStep,
  isMajorStep,
  label,
}) => {
  let passiveStyle = '';
  if (isMajorStep) {
    passiveStyle = `
      bg-green-300
      w-full
      h-2
      rounded-lg
      z-50
    `;
  }
  if (isMinorStep) {
    passiveStyle = `
      bg-neutral-300
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
    >
      {!isActive && false ? null : (
        <div className="absolute -translate-y-2 right-full pr-4">
          {label+1}
        </div>
      )}
    </div>   
  );
};

export default Notch;
