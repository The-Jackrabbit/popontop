import { a, SpringValue } from "react-spring";
import { Album } from "../../../../types/Albums";

export interface Props {
  containers: Album[];
  listStyles: {
    width: SpringValue<string>;
  };
  textColor: string;
}

const ChartList: React.FC<Props> = ({
  listStyles,
  textColor,
  containers,
}) => {
  return (
    <a.div
      style={{ ...listStyles }}
      className="overflow-x-hidden h-screen pt-9"
    >
      <ol 
        className="
          text-neutral-300 dark:text-neutral-600
          text-[8px]
          list-disc
          list-item
        "
        style={{ color: textColor }}
      >
        {containers.map((album, index) => (
          <li className="list-decimal list-inside list-item" key={index+'list'}>
            {album.artist} - {album.name}
          </li>
        ))}
      </ol>
    </a.div>
  );
};

export default ChartList;
