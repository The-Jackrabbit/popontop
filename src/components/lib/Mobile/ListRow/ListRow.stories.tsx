import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ListRow from './ListRow';
import { ALBUM_RESULTS } from '../../../../constants/test-data/search-results';
import { Album } from '../../../../types/Albums';

export default {
  title: 'lib/ListRow',
  component: ListRow,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ListRow>;

export const Single: ComponentStory<typeof ListRow> = () => {
  return (
    <div className="m-4 dark:bg-neutral-600">
      <ListRow album={ALBUM_RESULTS[0] as Album}>
        <p>hello world</p>
      </ListRow>
    </div>
  )
}

export const Multiple: ComponentStory<typeof ListRow> = () => {
  const [fruits, setFruits] = useState([
    { name: 'peach' },
    { name: 'plum' },
    { name: 'pear' },
  ]);
  return (
    <div className="m-4">
      {ALBUM_RESULTS.map((album, index) => (
        <ListRow
          key={JSON.stringify(album) + index}
          album={album}
          isLastRowInList={index === ALBUM_RESULTS.length - 1}
          removeSelfFromList={(): void => {
            setFruits((fruits) => {
              const newFruits = [...fruits];

              newFruits.splice(index, 1);

              return newFruits;
            });
          }}
        >
        </ListRow>
      ))}
    </div>
  )
}

