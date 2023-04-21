import { ComponentStory, ComponentMeta } from '@storybook/react';
import Grid, { useSize } from './Grid';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ALBUM_RESULTS } from '../../../constants/test-data/search-results';
import { useState } from 'react';

// thanks chat gpt :)
export function randomIntegerInRange(min: number, max: number): number {
  // Generate a random number in the range [min, max]
  const randomNumber = Math.random() * (max - min + 1) + min;

  // Return the random number as an integer
  return Math.floor(randomNumber);
}
export default {
  args: {
    columns: 10,

    rows: 10,
  },
  title: 'lib/Grid',
  component: Grid,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: 'iphonex',
    },
  },
} as ComponentMeta<typeof Grid>;

const DESKTOP_PARAMETERS = {
  viewport: {
    defaultViewport: 'desktop',
  },
};

export const useResizer = () => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const size = useSize(target);

  return {
    containerRef: {
      ref: setTarget,
    },
    size,
  };
};
const list = [...new Array(100)].map(
  () => ALBUM_RESULTS[randomIntegerInRange(0, 9)]
);
export const Mobile: ComponentStory<typeof Grid> = (args) => {
  const { containerRef, size } = useResizer();
  return (
    <div {...containerRef} className="flex m-4 h-full w-full">
      {size ? (
        <Grid
          {...args}
          itemComponent={({ index }) => (
            <img
              src={list[index]?.imageUrl ?? ''}
              alt={list[index]?.artist ?? ''}
              width={size.height}
              height={size.width}
            />
          )}
        />
      ) : null}
    </div>
  );
};

export const Desktop: ComponentStory<typeof Grid> = Mobile.bind({});

Desktop.parameters = DESKTOP_PARAMETERS;
