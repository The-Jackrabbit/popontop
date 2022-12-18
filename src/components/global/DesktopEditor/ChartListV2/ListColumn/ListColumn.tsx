import { Album } from '../../../../../styles/types/Albums';
import ListItem from './ListItem/ListItem';

export interface Props {
  list: Album[];
  startIndexOfColumn: number;
}

export const ListColumn: React.FC<Props> = ({ list, startIndexOfColumn }) => {
  return (
    <div>
      {list.map((listItem, index) => (
        <ListItem
          key={index + 'list-item'}
          listItem={listItem}
          index={startIndexOfColumn + index}
        />
      ))}
    </div>
  );
};

export default ListColumn;
