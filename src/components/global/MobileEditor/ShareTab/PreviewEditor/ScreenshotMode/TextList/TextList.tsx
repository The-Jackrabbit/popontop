import { Album } from '../../../../../../../types/Albums';

export interface Props {
  list: Album[];
}
export const TextList: React.FC<Props> = ({ list }) => {
  const numberOfColumns = Math.min(Math.ceil(list.length / 33), 3);
  const columns = getColumns(list, numberOfColumns);
  const basis = getBasis(columns.length);
  const fontSize = getFontSize(list.length);

  return (
    <>
      {columns.map((column, columnIndex) => (
        <div
          key={'column' + columnIndex}
          className={basis}
          style={{
            listStyle: 'inside',
            listStyleType: 'inherit',
            paddingBottom: '80px',
          }}
        >
          {column.map((album, index) => (
            <div className={fontSize} key={JSON.stringify(album)}>
              {index + 33 * columnIndex + 1} {')'} {album.artist} - {album.name}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export const getColumns = (
  list: Album[],
  numberOfColumns: number
): Album[][] => {
  const columns: Album[][] = [];
  for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    const column: Album[] = [];
    for (let i = 0; i < 33; i++) {
      const index = i + 33 * columnIndex;
      if (index < list.length) {
        column.push(list[index] as Album);
      }
    }
    columns.push(column);
  }

  return columns;
};

export const getFontSize = (listLength: number): string => {
  if (listLength >= 50) {
    return 'text-[5px]';
  }
  if (listLength >= 15) {
    return 'text-[8px]';
  }

  return 'text-[12px]';
};

export const getBasis = (columnsLength: number): string => {
  if (columnsLength >= 3) {
    return 'basis-1/3';
  }

  if (columnsLength === 2) {
    return 'basis-1/2';
  }

  return 'basis-full';
};
