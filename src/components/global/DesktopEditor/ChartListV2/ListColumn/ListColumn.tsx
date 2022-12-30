import { Album } from '../../../../../styles/types/Albums';
import ListItem from './ListItem/ListItem';

export interface Props {
  list: Album[];
  startIndexOfColumn: number;
  textColor: string;
}

export const ListColumn: React.FC<Props> = ({
  list,
  startIndexOfColumn,
  textColor,
}) => {
  return (
    <div>
      {list.map((listItem, index) => (
        <ListItem
          key={index + 'list-item'}
          listItem={listItem}
          index={startIndexOfColumn + index}
          textColor={textColor}
        />
      ))}
    </div>
  );
};

export default ListColumn;
