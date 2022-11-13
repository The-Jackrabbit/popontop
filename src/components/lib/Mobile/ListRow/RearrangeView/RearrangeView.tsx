import React from "react";
import Image from 'next/image';
import { ROW_HEIGHT } from "../../../../../frontend/hooks/use-disappear-row";
import { Album } from "../../../../../types/Albums";
import RearrangeViewButton from "./RearrangeViewButton/RearrangeViewButton";

export interface Props {
  album: Album;
  index: number;
  onClick: (rowMovementType: RowMovementType) => void;
}

export enum RowMovementType {
  DOWN_FIVE = 'DOWN_FIVE',
  DOWN_ONE = 'DOWN_ONE',
  UP_FIVE = 'UP_FIVE',
  UP_ONE = 'UP_ONE',
}

export const RearrangeView: React.FC<Props> = ({ album, index, onClick }) => {
  return (
    <div
      className="
        w-full
        flex justify-between
        "
    >
      {true ? (
        <div
          className="
            text-xs basis-1/12 shrink-0 
            flex flex-col justify-center content-center items-center
          "
        >
          <p>{ index + 1 }</p>
        </div>
      ) : null }
      <div className="basis-2/12 justify-start">
        <Image
          width={ROW_HEIGHT} 
          height={ROW_HEIGHT} 
          src={album.imageUrl} 
          alt={album.artist}
        />
      </div>
      <div className="basis-1/12"></div>
      <RearrangeViewButton
        className="basis-2/12"
        onClick={() => onClick(RowMovementType.DOWN_FIVE)}
      >
        <p>-</p>
        <p>5</p>
      </RearrangeViewButton>
      <RearrangeViewButton
        className="basis-2/12"
        onClick={() => onClick(RowMovementType.DOWN_ONE)}
      >
        <p>-</p>
        <p>1</p>
      </RearrangeViewButton>
      <RearrangeViewButton
        className="basis-2/12"
        onClick={() => onClick(RowMovementType.UP_ONE)}
      >
        <p>+</p>
        <p>1</p>
      </RearrangeViewButton>
      <RearrangeViewButton
        className="basis-2/12"
        onClick={() => onClick(RowMovementType.UP_FIVE)}
      >
        <p>+</p>
        <p>5</p>
      </RearrangeViewButton>
    </div>
  )
};

export default RearrangeView;
