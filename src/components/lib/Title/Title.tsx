import { useState } from "react";
import React from "react";
import Introduction from "./Introduction/Introduction";
import { Layout } from "./Layout";
import { Loader } from "./Loader";
import { PencilIcon } from "@heroicons/react/24/outline";

export interface Props {
  chartTitle: string;
  isActiveByDefault?: boolean;
  isLoading?: boolean;
  isReadOnly: boolean;
  setValue?: (value: string) => void;
  showIntroduction: boolean;
  textColor: string;
}

/**
 * TODO: move intridcution code outside of title
 */
const Title: React.FC<Props> = ({ 
  chartTitle,
  isActiveByDefault = false,
  isLoading = false,
  isReadOnly,
  setValue,
  showIntroduction,
  // textColor,
}) => {
  const [isEditing, setIsEditing] = useState(isActiveByDefault);
  const clickEditTitleButton = () => {
    setIsEditing(!isEditing);
  };

  if (showIntroduction) {
    return <Introduction />;
  }
  
  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <Layout
      title={
        isEditing ? (
          <input
            autoFocus
            value={chartTitle}
            onBlur={() => setIsEditing(false)}
            onChange={(e) => {
              setValue && setValue(e.target.value);
            }}
            placeholder="New title"
            className="
              focus-visible:outline-none active:outline-none
              bg-transparent
              border-bottom-2 border-b-2 
              w-full
            "
          />
        ) : <p className="basis-full">{chartTitle}</p>

      }
      toggleButton={
        !isReadOnly ? (
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
            <PencilIcon className="h-6 w-6" />
          </button>
        ) : null
      }
    />
  );
}

export default Title;