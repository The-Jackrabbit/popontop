import { Album } from '../../../../../types/Albums';
import { ListItemLoader } from './ListItem/Loader';

export interface Props {
  list: Album[];
  startIndexOfColumn: number;
}

export const Loader: React.FC<Props> = ({
  list,
  startIndexOfColumn,
}) => (
  <div>
    {list.map((_, index) => (
      <ListItemLoader
        key={index + 'list-item'}
        index={startIndexOfColumn + index}
      />
    ))}
  </div>
);

export const ListColumnLoader = Loader;

