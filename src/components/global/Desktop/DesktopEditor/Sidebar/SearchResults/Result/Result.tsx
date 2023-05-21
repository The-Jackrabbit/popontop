import { Album } from '../../../../../../../types/Albums';
import Draggable from '../../../DragNDrop/Draggable/Draggable';
import Image from 'next/image';

export interface Props {
  album: Album;
  className?: string;
  index: number;
}
export const DEFAULT_CLASSNAME =
  'cursor-grab basis-[calc(50%_-_4rem)] p-4 bg-black rounded-xl';

export const Result: React.FC<Props> = ({
  album,
  className = DEFAULT_CLASSNAME,
  index,
}) => {
  return (
    <Draggable
      data={{ data: album as Album, index, origin: 'search' }}
      id={`results-${index}`}
      className={className}
    >
      <Image
        width="100px"
        height="100px"
        src={album?.imageUrl}
        className="rounded-lg"
        alt={album?.artist}
      />
    </Draggable>
  );
};
