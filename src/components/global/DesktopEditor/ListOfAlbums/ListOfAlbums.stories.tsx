import { ComponentStory, ComponentMeta } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ListOfAlbums from './ListOfAlbums';
import { ALBUM_RESULTS } from '../../../../constants/test-data/search-results';
import { randomIntegerInRange } from '../../../lib/Grid/Grid.stories';
import { Album } from '../../../../types/Albums';

export default {
  args: {
    columnCount: 2,
  },
  title: 'lib/ListOfAlbums',
  component: ListOfAlbums,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: 'iphonex',
    },
  },
} as ComponentMeta<typeof ListOfAlbums>;

const DESKTOP_PARAMETERS = {
  viewport: {
    defaultViewport: 'desktop',
  },
};

const list = [...new Array(100)].map(
  () => ALBUM_RESULTS[randomIntegerInRange(0, 9)]
);
export const Mobile: ComponentStory<typeof ListOfAlbums> = (args) => {
  return <ListOfAlbums {...args} list={list as Album[]} />;
};

export const Desktop: ComponentStory<typeof ListOfAlbums> = Mobile.bind({});

Desktop.parameters = DESKTOP_PARAMETERS;
