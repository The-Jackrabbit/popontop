import { useState } from 'react';
import React from 'react';
import Introduction from './Introduction/Introduction';
import { Layout } from './Layout';
import { Loader } from './Loader';
import { PencilIcon } from '@heroicons/react/24/outline';

export interface Props {
  backgroundColor: string;
  chartTitle: string;
  isActiveByDefault?: boolean;
  isLoading?: boolean;
  isReadOnly: boolean;
  setValue?: (value: string) => void;
  showIntroduction: boolean;
  textColor: string;
}

const Title: React.FC<Props> = ({
  backgroundColor,
  chartTitle,
  isActiveByDefault = false,
  isLoading = false,
  isReadOnly,
  setValue,
  showIntroduction,
  textColor,
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

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value);
  };

  return (
    <Layout
      backgroundColor={backgroundColor}
      title={
        isEditing ? (
          <input
            autoFocus
            value={chartTitle}
            onBlur={() => setIsEditing(false)}
            onChange={onChange}
            onKeyUp={onKeyUp}
            placeholder="New title"
            className="
              border-bottom-2 w-full
              border-b-2
              bg-transparent focus-visible:outline-none 
              active:outline-none
            "
            style={{ color: textColor }}
          />
        ) : (
          <p className="basis-full" style={{ color: textColor }}>
            {chartTitle}
          </p>
        )
      }
      toggleButton={
        !isReadOnly ? (
          <button
            onClick={() => clickEditTitleButton()}
            className="
              outline-solid
              rounded
              outline-offset-2
              active:outline active:outline-2
              active:outline-rose-300
            "
          >
            <PencilIcon className="h-6 w-6" />
          </button>
        ) : null
      }
    />
  );
};

export default Title;
