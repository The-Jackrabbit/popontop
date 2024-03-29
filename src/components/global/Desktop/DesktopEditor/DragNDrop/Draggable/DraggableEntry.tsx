import Image from 'next/image';
import React from 'react';
import { Album } from '../../../../../../types/Albums';
import Draggable from './Draggable';

export type DragSubZone = 'search' | 'chart';

export interface DraggableDataNode<T> {
  data: T;
  index: number;
  origin: DragSubZone;
}

export interface Props {
  album: Album;
  index: number;
  isReadOnly?: boolean;
}

const DraggableEntry: React.FC<Props> = ({
  album,
  index,
  isReadOnly = false,
}) => (
  <Draggable
    data={{ data: album, index, origin: 'chart' }}
    id={`chart-${index.toString()}`}
    isReadOnly={isReadOnly}
    key={`chart-${index.toString()}-key`}
  >
    <Image
      src={album.imageUrl}
      // the dimensions below are required but dont do anything
      height="200px"
      width="200px"
      alt={album.name}
      priority={false}
    />
  </Draggable>
);

export default DraggableEntry;
