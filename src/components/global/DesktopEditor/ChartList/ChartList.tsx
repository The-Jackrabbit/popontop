import { a, SpringValue } from 'react-spring';
import { Album } from '../../../../styles/types/Albums';

export interface Props {
  containers: Album[];
  listStyles: {
    width: SpringValue<string>;
  };
  textColor: string;
}

const ChartList: React.FC<Props> = ({ listStyles, textColor, containers }) => {
  return (
    <a.div
      style={{ ...listStyles }}
      className="
        h-full max-h-[calc(100vh_-_2rem)]
        overflow-x-hidden overflow-y-hidden
      "
    >
      <ol
        className="
          list-item list-disc
          text-[8px]
          text-neutral-300
          dark:text-neutral-600
        "
        style={{ color: textColor }}
      >
        {containers.map((album, index) => (
          <li
            className="list-item list-inside list-decimal"
            key={index + 'list'}
          >
            {album.artist} - {album.name}
          </li>
        ))}
      </ol>
    </a.div>
  );
};

export default ChartList;
