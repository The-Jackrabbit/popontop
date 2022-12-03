import { a } from "react-spring";
import { useState } from "react";

export interface Props {
  chartTitle: string;
  isReadOnly: boolean;
  setValue: (value: string) => void;
  showIntroduction: boolean;
  textColor: string;
}

const Title: React.FC<Props> = ({ 
  chartTitle,
  isReadOnly,
  setValue,
  showIntroduction,
  textColor,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const clickEditTitleButton = () => {
    setIsEditing(!isEditing);
  };

  return (
    <a.div
      className={`
        rounded-lg bg-white dark:bg-[#0a0a0a]
        shadow-lg dark:shadow-neutral-800
        box-content
        py-6  px-6 sm:px-4 
      z-30
        overflow-hidden
        w-auto h-auto
        flex justify-between items-center 
      `}
      onClick={() => clickEditTitleButton()}
    >
      {!showIntroduction ? (
        <div
          className="
            flex justify-between w-full
            text-lg text-neutral-500 dark:text-neutral-200
          "
        >
          {isEditing ? (
            <input
              autoFocus
              value={chartTitle}
              style={{ color: textColor }}
              onBlur={() => setIsEditing(false)}
              onChange={(e) => { setValue(e.target.value) }}
              placeholder="New title"
              className="
                focus-visible:outline-none active:outline-none
                bg-transparent
                border-bottom-2 border-b-2 
                basis-full grow-1
              "
            />
          ) : <p className="basis-full">{chartTitle}</p>}

          {!isReadOnly ? (
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
          ) : null}
        </div>
      ) : (
        <div>
          <h1 className="leading-loose text-4xl">Hi :-)</h1>
          <p className="leading-normal text-xl">
            To get started, click the ➕. Search the name or your favorite albums, and add them to your list!
          </p>
        </div>
      )}
    </a.div>
  );
}

export default Title;