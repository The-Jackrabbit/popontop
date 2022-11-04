
import { a, SpringValue } from "react-spring";
import { Album } from "../../../../types/Albums";

export interface Props {
  listStyles: {
    width: SpringValue<string>;
  };
  textColor: string;
  containers: Album[]
}

const ChartList: React.FC<Props> = ({
  listStyles,
  textColor,
  containers,
}) => {
  return (
    <a.div
      style={{ ...listStyles, color: textColor }}
      className="
      overflow-x-hidden h-screen pt-9"
    >
      <ol className="dark:text-neutral-50 text-[8px] list-disc list-item">
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
