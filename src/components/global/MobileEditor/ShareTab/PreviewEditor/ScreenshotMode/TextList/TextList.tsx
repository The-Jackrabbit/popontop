import { Album } from "../../../../../../../styles/types/Albums";

export interface Props {
  list: Album[];
}

export const TextList: React.FC<Props> = ({ list }) => {
  const numberOfColumns = Math.min(Math.ceil(list.length/33), 3);
  const columns: Album[][] = (() => {
    const columns: Album[][] = [];
    for (let columnIndex = 0 ; columnIndex < numberOfColumns ; columnIndex++) {
      const column: Album[] = [];
      for (let i = 0 ; i < 33 ; i++) {
        const index = i + 33*columnIndex;
        if (index < list.length) {
          column.push(list[index] as Album);
        }
      }
      columns.push(column);
    }

    return columns;
  })();
  const fontSize: string = (() => {
    if (list.length >= 50) {
      return 'text-[5px]';
    }
    if (list.length >= 15) {
      return 'text-[8px]';
    }

    return 'text-[12px]'; 
  })();
  const basis: string = (() => {
    if (columns.length >= 3) {
      return 'basis-1/3';
    }
    if (columns.length === 2) {
      return 'basis-1/2';
    }

    return 'basis-full'; 
  })();
  return (
    <>
      {columns.map((column, columnIndex) => (
        <div
          key={'column'+columnIndex}
          className={basis}
          style={{ listStyle: 'inside', listStyleType: 'inherit'}}
        >
          {column.map((album, index) => 
            <div className={fontSize} key={JSON.stringify(album)}>
              {index +33*columnIndex + 1} {')'} {album.name} - {album.name}
            </div>
          )}
        </div>
      ))}
    </>
  );
} 