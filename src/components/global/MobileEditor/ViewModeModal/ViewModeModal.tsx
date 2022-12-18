import { useEffect, useState } from 'react';
import { Album } from '../../../../styles/types/Albums';
import Button from '../../../lib/Button/Button';
import Grid from '../../../lib/Grid/Grid';
import { useResizer } from '../../../lib/Grid/Grid.stories';
import NumberInput from '../../../lib/NumberInput/NumberInput';
import Title from '../../../lib/Title/Title';

export interface Props {
  chartTitle: string;
  columns: number;
  list: Album[];
  onDecrementColumns: () => void;
  onIncrementColumns: () => void;
  onDecrementRows: () => void;
  onIncrementRows: () => void;
  rows: number;
}

export const ViewModeModal: React.FC<Props> = ({
  chartTitle,
  columns,
  list,
  onDecrementColumns,
  onIncrementColumns,
  onDecrementRows,
  onIncrementRows,
  rows,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const listColumns = 1;
  const aa = (columns * rows) / listColumns;
  const firstColumn = list.filter((_, index) => index < aa);
  const secondColumn = list.filter((_, index) => index >= aa && index < 2 * aa);
  const thirdColumn = list.filter(
    (_, index) => index >= 2 * aa && index < 3 * aa
  );
  const onClickPreview = () => {
    setIsOverlayVisible(true);
    const t = document.getElementById('test-dark-meta');
    t?.setAttribute('content', 'rgba(0,0,0,0.98)');
  };
  useEffect(() => {
    const t = document.getElementById('test-dark-meta');
    return () => t?.setAttribute('content', '#171717');
  }, []);
  const { containerRef, size } = useResizer();
  return (
    <div
      {...containerRef}
      className="
        m-4 flex
        h-screen
        w-[calc(100%_-_24px)]
        flex-col dark:text-white
      "
    >
      <div className="z-30 basis-[3%]">
        <NumberInput
          className="mb-4 flex w-full justify-between"
          currentValue={rows}
          label="number of rows"
          onDecrement={onDecrementRows}
          onIncrement={onIncrementRows}
        />
      </div>
      <div className="basis-[3%]">
        <NumberInput
          className="mb-4 flex w-full justify-between"
          currentValue={columns}
          label="number of columns"
          onDecrement={onDecrementColumns}
          onIncrement={onIncrementColumns}
        />
      </div>
      <Button className="mb-4 basis-[4%]" onClick={onClickPreview}>
        Preview
      </Button>
      {size ? (
        <Grid
          size={size}
          itemComponent={({ index }) => (
            <img
              src={list[index]?.imageUrl ?? ''}
              alt={list[index]?.artist ?? ''}
              width={size.height}
              height={size.width}
            />
          )}
          columns={columns}
          rows={rows}
        />
      ) : null}
      {isOverlayVisible ? (
        <div className="fixed top-0 left-0 z-50">
          <div
            className="
              fixed right-0
            "
          >
            <div
              className="
                z-50
                h-screen w-screen
                bg-[rgba(0,0,0,0.98)] p-1
              "
              onClick={() => setIsOverlayVisible(false)}
            >
              <div className="flex h-full w-full flex-col">
                <Title
                  chartTitle={chartTitle}
                  isReadOnly={true}
                  setValue={() => undefined}
                  showIntroduction={false}
                  textColor="white"
                />
                {size ? (
                  <Grid
                    size={size}
                    itemComponent={({ index }) => (
                      <img
                        src={list[index]?.imageUrl ?? ''}
                        alt={list[index]?.artist ?? ''}
                        width={size.height}
                        height={size.width}
                      />
                    )}
                    columns={columns}
                    rows={rows}
                  />
                ) : null}
                <div className="flex basis-[30%] flex-row">
                  <ol
                    className="basis-1/3"
                    style={{ listStyle: 'inside', listStyleType: 'inherit' }}
                  >
                    {firstColumn.map((album) => (
                      <li className="text-[8px]" key={JSON.stringify(album)}>
                        {album.name}
                      </li>
                    ))}
                  </ol>
                  <ol
                    className="basis-1/3"
                    style={{ listStyle: 'inside', listStyleType: 'inherit' }}
                  >
                    {secondColumn.map((album) => (
                      <li className="text-[8px]" key={JSON.stringify(album)}>
                        {album.name}
                      </li>
                    ))}
                  </ol>
                  <ol
                    className="basis-1/3"
                    style={{ listStyle: 'inside', listStyleType: 'inherit' }}
                  >
                    {thirdColumn.map((album) => (
                      <li className="text-[8px]" key={JSON.stringify(album)}>
                        {album.name}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ViewModeModal;
