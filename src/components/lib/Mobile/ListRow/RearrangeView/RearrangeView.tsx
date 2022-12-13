import React, { useEffect } from "react";
import Image from 'next/image';
import { ROW_HEIGHT } from "../../../../../frontend/hooks/springs/use-disappear-row";
import { Album } from "../../../../../styles/types/Albums";
import RearrangeViewButton from "./RearrangeViewButton/RearrangeViewButton";
import { useSpring, a, config } from "react-spring";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

export interface Props {
  album: Album;
  index: number;
  onClick: (rowMovementType: RowMovementType) => void;
  showAlbums: boolean;
}

export enum RowMovementType {
  DOWN_FIVE = 'DOWN_FIVE',
  DOWN_ONE = 'DOWN_ONE',
  UP_FIVE = 'UP_FIVE',
  UP_ONE = 'UP_ONE',
}

export const JUMP_VALUES = {
  [RowMovementType.UP_FIVE]: 6,
  [RowMovementType.UP_ONE]:  1,
  [RowMovementType.DOWN_ONE]: -1,
  [RowMovementType.DOWN_FIVE]: -6,
};

export const RearrangeView: React.FC<Props> = ({
  album,
  index,
  onClick,
  showAlbums,
}) => {
  const [rotateX, animateRotationY] = useSpring(() => ({
    rotateX: '90deg',
    config: config.wobbly
  }))

  useEffect(() => {
    animateRotationY.start({ rotateX: '0deg' });
  }, [animateRotationY]);

  return (
    <a.div className="w-full flex justify-between">
      {showAlbums ? (
        <div
          className="
            text-xs basis-1/12 shrink-0 
            flex flex-col justify-center content-center items-center
          "
        >
          <p>{ index + 1 }</p>
        </div>
      ) : null }
      <div className="basis-2/12">
        <Image
          width={ROW_HEIGHT} 
          height={ROW_HEIGHT} 
          src={album.imageUrl} 
          alt={album.artist}
        />
      </div>
      <a.div
        style={{ ...rotateX }}
        className="
          text-neutral-600 dark:text-neutral-400
          tracking-wide basis-9/12 shrink-1 flex justify-center
        "
      >
        <RearrangeViewButton
          className="shrink-0 basis-3/12"
          onClick={() => onClick(RowMovementType.DOWN_FIVE)}
        >
          <p>
            <ArrowDownIcon className="h-4 w-4  text-neutral-900 dark:text-neutral-50 inline" />5
          </p>
        </RearrangeViewButton>
        <RearrangeViewButton
          className="shrink-0 basis-3/12"
          onClick={() => onClick(RowMovementType.DOWN_ONE)}
        >
           <p>
            <ArrowDownIcon className="h-4 w-4  text-neutral-900 dark:text-neutral-50 inline" />1
          </p>
        </RearrangeViewButton>
        <RearrangeViewButton
          className="shrink-0 basis-3/12"
          onClick={() => onClick(RowMovementType.UP_ONE)}
        >
          <p>
            <ArrowUpIcon className="h-4 w-4  text-neutral-900 dark:text-neutral-50 inline" />1
          </p>
        </RearrangeViewButton>
        <RearrangeViewButton
          className="shrink-0 basis-3/12"
          onClick={() => onClick(RowMovementType.UP_FIVE)}
        >
          <p>
            <ArrowUpIcon className="h-4 w-4  text-neutral-900 dark:text-neutral-50 inline" />5
          </p>
        </RearrangeViewButton>
      </a.div>
    </a.div>
  )
};

export default RearrangeView;
