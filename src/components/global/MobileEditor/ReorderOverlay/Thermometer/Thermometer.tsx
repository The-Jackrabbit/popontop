// import { a, useSpring } from "react-spring";

import Notch from "./Notch/Notch";

export interface Props {
  activeValue? : number;
  min: number;
  max: number;
}

const Thermometer: React.FC<Props> = ({
  activeValue = 50,
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
      <div className="  text-center px-6 text-sm basis-1/12">
        {/* {min} */}
        top of the list
      </div>
      <div
        className="
          basis-10/12
          m-2 relative
        "
      >
        <div
          className="
            w-8 h-full
            flex flex-col
            justify-between z-50
          "
        >
          {[... new Array(101)].map((_, index) => (
            <Notch
              key={index}
              index={index}
              isActive={index === 37}
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
      <div className=" text-center px-2 text-sm basis-1/12 flex justify-end flex-col">
        {/* {max} */}
        bottom of the list
      </div>
    </div>
  );
};

export default Thermometer;
