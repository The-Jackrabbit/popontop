import React from 'react';
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
      <ListRow
        album={ALBUM_RESULTS[0] as Album}
        index={0}
        isInteractive={true}
        isLastRowInList={true}
        setIsScrollDisabled={() => undefined}
        removeSelfFromList={() => undefined}
        onAdvanceAlbumAtIndex={() => undefined}
        openRearrangeView={() => undefined}
        onLowerAlbumAtIndex={() => undefined}
        textColor={'green'}
      />
    </div>
  )
}

export const Multiple: ComponentStory<typeof ListRow> = () => {
 
  return (
    <div className="m-4 w-96 overflow-x-hidden">
      {ALBUM_RESULTS.map((album, index) => (
        <ListRow
          key={JSON.stringify(album) + index}
          album={album}
          index={index}
          isInteractive={true}
          setIsScrollDisabled={() => undefined}
          onAdvanceAlbumAtIndex={() => undefined}
          onLowerAlbumAtIndex={() => undefined}
          openRearrangeView={() => undefined}
          isLastRowInList={index === ALBUM_RESULTS.length - 1}
          removeSelfFromList={(): void =>  undefined}
          textColor={'green'}
        />
      ))}
    </div>
  )
}

