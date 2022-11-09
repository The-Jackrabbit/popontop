// import { a, useSpring } from "react-spring";

import Notch from "./Notch/Notch";

export interface Props {
  min: number;
  max: number;
  offset?: number;
  currentValue: number;
  initialValue: number;
}

const Thermometer: React.FC<Props> = ({
  currentValue = 50,
  initialValue,
  min,
  max,
}) => {

  return (
    <div
      className="
        flex flex-col items-center justify-between h-full
        dark:text-neutral-50
      "
    >
      
      <div
        className="
          basis-full
          relative
        "
      >
        <div
          className="
            w-8 h-full
            flex flex-col
            justify-between z-50
          "
        >
          {[... new Array(max-min)].map((_, index) => (
            <Notch
              key={`notch-${index}`}
              index={min + index}
              isActive={index === currentValue}
              isMajorStep={false}
              isMinorStep={true} //index%10 === 0 && index%20 !== 0}
              label={index}
            />
          ))}
        </div>
        <div
          className="
            w-2  z-10
            rounded-lg bg-neutral-300
            absolute top-0 bottom-0 left-[calc(50%_-_4px)]
          "
        >

        </div>
      </div>
    
    </div>
  );
};

export default Thermometer;
// <div className=" text-center px-2 text-sm basis-1/12 flex justify-end flex-col">
// {/* {max} */}
// bottom of the list
// </div>
// <div className="  text-center px-6 text-sm basis-1/12">
//         {/* {min} */}
//         top of the list
//       </div>