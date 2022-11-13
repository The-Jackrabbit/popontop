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
      <div className="basis-2/12">
        <Image
          width={ROW_HEIGHT} 
          height={ROW_HEIGHT} 
          src={album.imageUrl} 
          alt={album.artist}
        />
      </div>
      <div className="tracking-wide basis-9/12 shrink-1 flex justify-center">
        <RearrangeViewButton
          className="shrink-0 basis-3/12"
          onClick={() => onClick(RowMovementType.DOWN_FIVE)}
        >
          -5
        </RearrangeViewButton>
        <RearrangeViewButton
          className="shrink-0 basis-3/12"
          onClick={() => onClick(RowMovementType.DOWN_ONE)}
        >
          -1
        </RearrangeViewButton>
        <RearrangeViewButton
          className="shrink-0 basis-3/12"
          onClick={() => onClick(RowMovementType.UP_ONE)}
        >
          +1
        </RearrangeViewButton>
        <RearrangeViewButton
          className="shrink-0 basis-3/12"
          onClick={() => onClick(RowMovementType.UP_FIVE)}
        >
          +5
        </RearrangeViewButton>
      </div>
    </div>
  )
};

export default RearrangeView;
