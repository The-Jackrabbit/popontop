import { useRef, useState } from "react";
import { a, useSpring } from "react-spring";
import Input from "../../../lib/Input/Input";


export interface Props {
  chartTitle: string;
  setValue: (value: string) => void;
  showIntroduction: boolean;
  style: any;
}

const Title: React.FC<Props> = ({ 
  chartTitle,
  setValue,
  showIntroduction,
  style,
 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [opacity, opacityApi] = useSpring(() => ({
    to: { opacity: '0' },
    from: { opacity: '1' },
    config: {
      bounce: 0.1,
      friction: 20,
      mass:4,
      tension: 200,
    },
    delay: 500,
    loop: true,
    reverse: true,
  }));
  const clickEditTitleButton = () => {

    setIsEditing(!isEditing);
  
  }
  return (
    <a.div
      style={{ ...style }}
      className="
        rounded-lg bg-white dark:bg-[#0a0a0a]
        shadow-2xl
        px-6 py-4 sm:px-4 sm:py-3
        overflow-hidden
      "
    >
      <a.div style={opacity}>
        {showIntroduction ? (
          <div className=" flex justify-between text-lg text-neutral-500 dark:text-neutral-200">
            {!isEditing
              ? <p>{chartTitle}</p>
              : (
                <input
                  value={chartTitle}
                  onChange={(e) => { setValue(e.target.value) }}
           
                  placeholder="New title"
                  className="bg-neutral-900"
                />
              )
            }

            <button
              onClick={() => clickEditTitleButton()}
              className="
                active:outline-rose-300
                active:outline
                outline-offset-2
                active:outline-2 outline-solid
                rounded"
            >
              ✎
            </button>
          </div>
        ) : (
          <>
            <h1 className="leading-loose text-4xl">Hi :-)</h1>
            <p className="leading-normal text-xl">To get started, click the ➕. Search the name or your favorite albums, and add them to your list!</p>
          </>
        )}
      </a.div>
    </a.div>
  );
}

export default Title;