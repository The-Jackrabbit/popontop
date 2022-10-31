import { useState } from "react";
import { a, useSpring, SpringValue } from "react-spring";

export interface Props {
  chartTitle: string;
  setValue: (value: string) => void;
  showIntroduction: boolean;
  titleHeightStyle?: { height: SpringValue<string>; };
}

const Title: React.FC<Props> = ({ 
  chartTitle,
  setValue,
  showIntroduction,
  titleHeightStyle,
 }) => {
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  };

  return (
    <a.div
      style={titleHeightStyle ? { ...titleHeightStyle } : undefined}
      className="
        rounded-lg bg-white dark:bg-[#0a0a0a]
        shadow-xl
        box-content
        px-6 py-4 sm:px-4 sm:py-3
        mb-4
        overflow-hidden
      "
    >
      <a.div style={opacity}>
        {showIntroduction ? (
          <div
            className="
              flex justify-between
              text-lg text-neutral-500 dark:text-neutral-200
            "
          >
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
                rounded
              "
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