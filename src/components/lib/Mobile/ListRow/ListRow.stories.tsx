import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListRow, { ListRowMode } from './ListRow';
import { ALBUM_RESULTS } from '../../../../constants/test-data/search-results';
import { Album } from '../../../../styles/types/Albums';

export default {
  args: {
    mode: 'DELETE',
  },
  title: 'lib/ListRow',
  component: ListRow,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ListRow>;

export const DeleteView: ComponentStory<typeof ListRow> = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="m-4 ">
      <button onClick={() => setIsActive(!isActive)}>toggle</button>
      {isActive && (
        <ListRow
          album={ALBUM_RESULTS[0] as Album}
          mode={ListRowMode.DELETE}
          index={0}
          isLastRowInList={true}
          removeSelfFromList={() => setIsActive(false)}
          onRearrangeClick={() => undefined}
          showAlbums={true}
          textColor={'green'}
        />
      )}
    </div>
  );
};

export const Multiple: ComponentStory<typeof ListRow> = () => {
  return (
    <div className="m-4 w-96 overflow-x-hidden">
      {ALBUM_RESULTS.map((album, index) => (
        <ListRow
          key={JSON.stringify(album) + index}
          mode={ListRowMode.REARRANGE}
          album={album}
          index={index}
          showAlbums={true}
          isLastRowInList={index === ALBUM_RESULTS.length - 1}
          removeSelfFromList={(): void => undefined}
          textColor={'green'}
        />
      ))}
    </div>
  );
};

export const RearrangeView: ComponentStory<typeof ListRow> = () => {
  return (
    <div className="m-4 w-96 overflow-x-hidden">
      {ALBUM_RESULTS.map((album, index) => (
        <ListRow
          key={JSON.stringify(album) + index}
          mode={ListRowMode.REARRANGE}
          album={album}
          index={index}
          showAlbums={true}
          isLastRowInList={index === ALBUM_RESULTS.length - 1}
          removeSelfFromList={(): void => undefined}
          textColor={'green'}
        />
      ))}
    </div>
  );
};

export const SearchView: ComponentStory<typeof ListRow> = () => {
  return (
    <div className="m-4 w-96 overflow-x-hidden">
      {ALBUM_RESULTS.map((album, index) => (
        <ListRow
          key={JSON.stringify(album) + index}
          mode={ListRowMode.SEARCH}
          album={album}
          index={index}
          showAlbums={true}
          isLastRowInList={index === ALBUM_RESULTS.length - 1}
          removeSelfFromList={(): void => undefined}
          textColor={'green'}
        />
      ))}
    </div>
  );
};
